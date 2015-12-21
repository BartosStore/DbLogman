/*==========================================================================================================*/
/* (c) ApSo                                                                                                 */
/*..........................................................................................................*/
/* main program name : s_usrflt3.p                                                                          */
/* function          : Zpracovani dat pro AS (s_usrflt2.p) a dale na WS                                     */
/* generate date     : 03.12.2015                                                                           */
/* author            : MiBa                                                                                 */
/*----------------------------------------------------------------------------------------------------------*/
/* date of changes   : who        : why the hell                                                            */
/*..........................................................................................................*/
/*==========================================================================================================*/

{{gen_ver.num "g_prggl.var"}}

{./var/s_usfltr.var
  &tt-name = "ttFltr"
}

/* -- vypis input/output parametru pro dynamickou zmenu -- */
def output param table for ttFltr.

/* ------------------------------------------------------- */
for each ttFltr:
  delete ttFltr.
end.

for each m_usrtab where
  m_usrtab.ucje = getucje('m_usrtab') no-lock:

    create ttFltr.
    assign
      ttFltr.lname = m_usrtab.login-name
      ttFltr.lnam2 = m_usrtab.login-name.

end.
