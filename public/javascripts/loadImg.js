import util from './util';

export default function(file, callback) {
    let fr = new FileReader();
    fr.readAsDataURL(file);

    fr.onload = e => {
        callback(util.$c('img', {
            className: 'pic',
            src: e.target.result
        }));
    }
}