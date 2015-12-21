/*==========================================================================================================*/
/* (c) ApSo                                                                                                 */
/*..........................................................................................................*/
/* main program name : s_usrdat.p                                                               */
/* function          : Zpracovani dat pro AS a dale na WS                                                                    */
/* generate date     : 03.12.2015                                                                  */
/* author            : MiBa                                                                                 */
/*----------------------------------------------------------------------------------------------------------*/
/* date of changes   : who        : why the hell                                                            */
/*..........................................................................................................*/
/*==========================================================================================================*/

{{gen_ver.num "g_prggl.var"}}

{./var/s_usrlog.var
  &tt-name = "ttUser"
}

def input param iocuser as c.

/* -- vypis input/output parametru pro dynamickou zmenu -- */
def output param table for ttUser.

/* ------------------------------------------------------- */
for each ttUser:
  delete ttUser.
end.

for each his_akce where
  his_akce.ucje = getucje('his_akce') and
  his_akce.iidprogr = 12 and
  his_akce.cuziakce = iocuser and
  his_akce.ddatakce > 10/31/2015 no-lock,

  first hismodpr where
    hismodpr.ucje = getucje('hismodpr') and
    hismodpr.iidprogr = his_akce.iidprogr no-lock,

    first hisproak where
      hisproak.ucje = getucje('hisproak') and
      hisproak.iId_Akce = his_akce.iId_Akce no-lock:

        create ttUser.
        assign
          ttUser.aid = his_akce.iIdHisto
          ttUser.usr = his_akce.cuziakce
          ttUser.dat = string(his_akce.ddatakce, '99.99.9999':u) + ' ' + string(his_akce.iCasAkce, 'hh:mm:ss')
          ttUser.moc = hismodpr.cpopisek
          ttUser.acc = hisproak.cpopakce.

end.
