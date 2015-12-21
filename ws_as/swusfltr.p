/*------------------------------------------------------------------------
    File        : swusfltr.p
    Purpose     : Get users from m_usrtab for logman app
    Description :
    Author(s)   : miba
    Created     : 14.12.2015
  ----------------------------------------------------------------------*/
{{gen_ver.num "g_ws.var"}}

/* -- definice TT pro komunikaci;
   -- TT se definuje pres .var, protoze je nutna ve webspeedu
   -- ale i na aplikacnim serveru, kde se predava jako parametr;
   -- */

{./var/s_usfltr.var
  &tt-name="ttFltr"
}

def var cttdata as longchar no-undo.

{{gen_ver.num "g_wsblk.i"}
  &spec-akt = "run specakt."
}

/*============================================================================*/
/*================== procedury ===============================================*/
/*============================================================================*/
PROCEDURE specakt:
  do on error undo, return error return-value:
    /* ---------------------------------------------------------------------- */
    /* -
       - volej AS a vrat uzivatele z m_usrtab
       - */
    /* ---------------------------------------------------------------------- */
    run s_usflt2.p on {&APPSRV} (output table ttFltr).
    /* ---------------------------------------------------------------------- */

    temp-table ttFltr:write-json('longchar':u, cttdata).

    run addwebcontextparam(
      {&TYPETT_OUTPUT_JSON_PARAM},
      temp-table ttFltr:name,
      cttdata
    ).
    /* ---------------------------------------------------------------------- */
  end.
  return.
END PROCEDURE. /* specakt */
