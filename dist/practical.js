import {mountServerRoom} from './server-room.js?v=missions12';
import {mountNetwork} from './network-game.js?v=missions12';
import {mountDeveloper} from './developer-game.js?v=missions12';
export const jobs={
 frontend:{name:'Разработчик',icon:'▧',title:'Релиз для маленького кафе',hint:'Воспроизведи жалобы, исправь поведение приложения и проверь выпуск.',result:'Ты собрал экран из компонентов: заголовка, карточки занятия и кнопки. Компоненты можно менять отдельно — так интерфейс проще поддерживать.',color:'#a8bcf1'},
 security:{name:'Белый хакер',icon:'◇',title:'Тихое проникновение',hint:'Захватывай узлы сети, выбирай маршрут и контролируй обнаружение.',color:'#e5ba65'},
 sysadmin:{name:'Сисадмин',icon:'⌁',title:'Три комнаты инфраструктуры',hint:'WASD — идти, Shift — бежать, E — взаимодействовать. Восстанови сеть, перезапусти серверы и установи SSD и RAM.',color:'#98cbd3'}
};
export function mountPuzzle(host,id,onComplete){
 const games={sysadmin:mountServerRoom,security:mountNetwork,frontend:mountDeveloper};
 if(!games[id])throw new Error('Неизвестная профессия');
 return games[id](host,onComplete);
}
