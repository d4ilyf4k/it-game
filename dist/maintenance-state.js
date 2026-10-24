export const createMaintenance=()=>({network:false,restarted:[],rebooting:null,powered:true,drawer:'closed',installed:[],busy:null,done:false});
export function maintenanceAction(s,action,item){
 if(s.done)return false;
 if(action==='network'&&!s.network){s.network=true;return true;}
 if(!s.network)return false;
 if(action==='restart'&&['A','B'].includes(item)&&!s.rebooting&&!s.restarted.includes(item)){s.rebooting=item;return true;}
 if(action==='restart-complete'&&s.rebooting===item){s.restarted.push(item);s.rebooting=null;return true;}
 if(s.restarted.length<2)return false;
 if(action==='power-off'&&s.powered&&!s.busy){s.powered=false;return true;}
 if(action==='open'&&!s.powered&&s.drawer==='closed'&&!s.busy){s.drawer='opening';s.busy='open';return true;}
 if(action==='opened'&&s.busy==='open'){s.drawer='open';s.busy=null;return true;}
 if(action==='install'&&!s.powered&&s.drawer==='open'&&!s.busy&&['ssd','ram'].includes(item)&&!s.installed.includes(item)){s.busy=item;return true;}
 if(action==='installed'&&s.busy===item&&['ssd','ram'].includes(item)){s.installed.push(item);s.busy=null;return true;}
 if(action==='close'&&s.drawer==='open'&&s.installed.length===2&&!s.busy){s.drawer='closing';s.busy='close';return true;}
 if(action==='closed'&&s.busy==='close'){s.drawer='closed';s.busy=null;return true;}
 if(action==='power-on'&&!s.powered&&s.drawer==='closed'&&s.installed.length===2&&!s.busy){s.busy='boot';return true;}
 if(action==='booted'&&s.busy==='boot'){s.powered=true;s.busy=null;s.done=true;return true;}
 return false;
}
