export default function(x, y, obj) {
    return x < obj.left || x > obj.right || y > obj.bottom || y < obj.top;
}