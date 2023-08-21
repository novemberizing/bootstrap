
const novemberizing = {
    dom: {
        parent: (node, name) => {
            while(node && node.nodeName && node.nodeName.toLowerCase() !== name) {
                node = node.parentNode;
            }
            return node;
        },
        previous: (node, name) => {
            while(node && node.nodeName.toLowerCase() !== name) {
                node = node.previousElementSibling;
            }
            return node;
        },
        children: {
            remove: o => {
                while(o.firstChild) {
                    o.lastChild.remove();
                }
            }
        }
    },
    date: {
        equal: (x, y) => {
            return x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth() && x.getDate() === y.getDate();
        },
        str: (date, splitter = '/') => {
            function adjust(n) {
                return n < 10 ? `0${n}` : n;
            }
            return `${date.getFullYear()}${splitter}${adjust(date.getMonth() + 1)}${splitter}${adjust(date.getDate())}`;
        },
        next: (date, step = 1) => {
            date.setDate(date.getDate() + step);
            return date;
        },
        month: {
            str: date => {
                function adjust(n) {
                    return n < 10 ? `0${n}` : n;
                }
                return `${date.getFullYear()}/${adjust(date.getMonth() + 1)}`;
            },
            begin: date => {
                date.setDate(1);
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            },
            previous: date => {
                date.setMonth(date.getMonth() - 1);
                date.setDate(1);
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            },
            next: date => {
                date.setMonth(date.getMonth() + 1);
                date.setDate(1);
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            }
        },
        week: {
            begin: date => {
                date.setDate(date.getDate() - date.getDay());
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            }
        }
    }
};

export default novemberizing;