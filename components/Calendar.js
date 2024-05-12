import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function Calendar2() {
  useEffect(()=>{
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {"styles":{"branding":{"brandColor":"#eb4c60"}},"hideEventTypeDetails":false,"layout":"column_view"});
    })();
  }, [])
  return <Cal 
    calLink="danigleba/30min"
    style={{width:"100%",height:"100%", overflow:"scroll"}}
    config={{layout: 'column_view'}}
  />;
};
