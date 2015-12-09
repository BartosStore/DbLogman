/*------------------------------------------------------------------------
    File        : swusrlog.p
    Purpose     : Get data from application server for logman app
    Description :
    Author(s)   : miba
    Created     : 30.11.2015
  ----------------------------------------------------------------------*/
{{gen_ver.num "g_ws.var"}}

/* -- definice TT pro komunikaci;
   -- TT se definuje pres .var, protoze je nutna ve webspeedu
   -- ale i na aplikacnim serveru, kde se predava jako parametr;
   -- */

{./var/s_usrlog.var
  &tt-name="ttUser"
}

def var cdatatt as longchar no-undo.

{{gen_ver.num "g_wsblk.i"}
  &spec-akt = "run specakt."
}


/*============================================================================*/
/*================== procedury ===============================================*/
/*============================================================================*/
PROCEDURE specakt:
  do on error undo, return error return-value:
    run s_getact.p on {&APPSRV} (output table ttUser).

    temp-table ttUser:write-json('longchar':u, cdatatt).

    run addwebcontextparam({&TYPETT_OUTPUT_JSON_PARAM},
      temp-table ttUser:name, cdatatt).
  end.
  return.
END PROCEDURE. /* specakt */
