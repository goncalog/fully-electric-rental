export default function getFullEvTitle(ev) {
    return (ev.model.secondary_name) ?
    `${ev.make.name} ${ev.model.name} ${ev.model.secondary_name}` : 
    `${ev.make.name} ${ev.model.name}`;
}
