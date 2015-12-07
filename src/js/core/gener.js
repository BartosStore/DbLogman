var gener = {};

/**
 * Vynulovani JSON requestu.
 *
 * @internal
 */
gener._setDefaultRequest = function _setDefaultRequest() {
    this._values.request = {ttWebContext: []};
};

/**
 * Soubor systemovych a uzivatelskych hodnot v ramci sezeni.
 *
 * @internal
 */
gener._values = {
    request: {
        ttWebContext: []
    },
    ttPinAuth: [
        {
            loginName: '',
            pin: '',
            ucje: '',
            newLogin: ''
        }
    ],
    ttWebParam: [
        {
            keyName: 'verWebCon',
            valueName: '3'
        }
    ]
};

/**
 * Vrati aktualni podobu JSON pozadavku, ktery se ma odeslat na server.
 *
 * @internal
 */
gener._getRequest = function _getRequest() {
    return this._values.request;
};

/**
 * Nastaveni prihlasovacich udaju.
 *
 * @param {string} prihlasovaciJmeno prihlasovaci jmeno: 'vaso'
 * @param {string} heslo heslo: '1234'
 * @param {string} ucetniJednotka ucetni jednotka: 'apso'
 */
gener.setLogin = function setLogin(prihlasovaciJmeno, heslo, ucetniJednotka, novePrihlaseni) {
    this._values.ttPinAuth[0].loginName = prihlasovaciJmeno;
    this._values.ttPinAuth[0].pin = heslo;
    this._values.ttPinAuth[0].ucje = ucetniJednotka;
    this._values.ttPinAuth[0].newLogin = novePrihlaseni;
};

/**
 * Vrati data pozadovane tabulky z odpovedi serveru, tedy z ttWebContext.
 *
 * @param {string} srcJson kompletni JSON ze serveru jako string
 * @param {string} ttName nazev tabulky, jejiz data chceme ziskat: 'ttNacZahl'
 */
gener.getParam = function getParam(srcJson, ttName) {
    srcJson = JSON.parse(srcJson);
    var json = srcJson.ttWebContext;
    for (var index in json) {
        if (json.hasOwnProperty(index)) {
            var item = json[index].nameTT;
            /*            if (item === 'ttWSError') {
             var ttWSError = JSON.parse(json[index].dataTT).ttWSError;
             console.error(ttWSError[0].cErrMsg);
             return {};
             }   */
            if (item === ttName) {
                var wanted = JSON.parse(json[index].dataTT);
                wanted = wanted[ttName];
                return wanted;
            }
        }
    }

    /*console.error('Tabulka '
        .concat(ttName)
        .concat(' nebyla nalezena v odpovědi serveru.'));*/
    console.log(srcJson);
};

/**
 * Prida 'temp-table' do pozadavku, ktery se bude odesilat serveru.
 *
 * @param {string} name - nazev 'temp-table': 'ttNacZahl'
 * @param {array} data - pole hodnot korespondujici se strukturou 'temp-table'
 * na serveru: [{value: 1, name: 'xx'}, ... ]
 */
gener.addParam = function addParam(name, data) {
    var object = {};
    object[name] = data;
    this._values.request.ttWebContext.push({
        dataTT: JSON.stringify(object),
        nameTT: name,
        typeTT: 1
    });
};

/**
 * Hromadne vlozeni parametru do ttWebContext.
 *
 * @param {array} arrayOfParams - pole vstupnich parametru pro gener.addParam:
 *      [
 *          {name: 'ttPinAuth', data: config.ttPinAuth},
 *          {name: 'ttUkol', data: ttNajdi},
 *          ...
 *      ]
 */
gener.addParams = function addParams(arrayOfParams) {
    var param;
    for (param of arrayOfParams) {
        this.addParam(param.name, param.data);
    }
};

/**
 * Callback pro zpracovani dat ze serveru a vyvolani
 * udalosti o zmene pro aktualizaci komponent.
 *
 * @callback handleDataCallback
 * @param {string} data stringified JSON jako odpoved ze serveru
 */

/**
 * Odeslani asynchronniho pozadavku a provedeni callbacku pri ziskani odpovedi.
 * ttWebContext po odeslani pozadavku vynuluje.
 *
 * @param {string} url cilova adresa, kam se ma pozadavek zaslat:
 *              'http://kryton/cgi-bin/wspd_cgi.sh/wcanodif'
 * @param {handleDataCallback} handleData callback pro zpracovani prijatych dat:
 *              function(data) {
 *                  var links = g.getParam(data, 'ttLink');
 *                  var nodes = g.getParam(data, 'ttNode');
 *                  var dejta = {
 *                      'nodes': nodes,
 *                      'links': links
 *                  };
 *                  _graphData = dejta;
 *                  AppStore.emitChange();
 *              }
 *              !!! Dulezite je rucni vyvolani udalosti o zmene pro store
 */
gener.sendRequest = function sendRequest(url, handleData) {
    /* TODO
     * Docasne reseni. Po vyreseni prihlasovani nutno predelat.
     */
    //this.setLogin('vaso', '2222', 'apso');
    this.addParams([
        {name: 'ttPinAuth', data: this._values.ttPinAuth},
        {name: 'ttWebParam', data: this._values.ttWebParam}
    ]);

    console.log('---> HTTP POST ' + url);
    console.log(JSON.stringify(this._values.request));
    console.log('---> END HTTP ');

    var request = new XMLHttpRequest();
    var error = '';
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = function onreadystatechange() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                console.log('<--- HTTP ' + this.status + ' ' + url);

                handleData(this.responseText);

                console.log('<--- END HTTP');

                error = gener.getParam(this.responseText, 'ttWSError');
                if (typeof error !== "undefined") {
                    alert(error[0].cErrMsg);
                }



            } else {
                // Error :(
                console.error('XMLHttpRequest error, zatim neosetreno');
            }
        }
    };

    request.send(JSON.stringify(gener._getRequest()));
    request = undefined;

    this._setDefaultRequest();
};

export default gener;
