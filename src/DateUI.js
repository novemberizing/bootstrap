
const novemberizing = {
    dom: {
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

export default class DateUI {
    static #all = /* html */ `<div class="calendar">
    <div class="input-group">
        <input type="text" class="form-control" data-date="" disabled>
        <span class="input-group-text">
            <button type="button" class="btn btn-link"><i class="fa-regular fa-calendar"></i></button>
        </span>
    </div>
    <div class="form small hide" data-focus-date="">
        <div class="calendar-header d-flex justify-content-between mb-3">
            <button type="button" class="btn btn-light btn-sm text-start month fw-bold"></button>
            <div>
                <button type="button" class="btn btn-light btn-sm up"><i class="fa-solid fa-caret-up"></i></button>
                <button type="button" class="btn btn-light btn-sm down"><i class="fa-solid fa-caret-down"></i></button>
            </div>
        </div>
        <div class="calendar-body mb-2">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Sun</th>
                        <th scope="col">Mon</th>
                        <th scope="col">Tue</th>
                        <th scope="col">Wed</th>
                        <th scope="col">Thu</th>
                        <th scope="col">Fri</th>
                        <th scope="col">Sat</th>
                    </tr>
                </thead>
            </table>
            <div class="calendar-date">
                <table class="table">
                    <tbody>
                        <tr>
                            <td><button type="button" class="btn btn-link btn-sm"></button></td>
                            <td><button type="button" class="btn btn-link btn-sm"></button></td>
                            <td><button type="button" class="btn btn-link btn-sm"></button></td>
                            <td><button type="button" class="btn btn-link btn-sm"></button></td>
                            <td><button type="button" class="btn btn-link btn-sm"></button></td>
                            <td><button type="button" class="btn btn-link btn-sm"></button></td>
                            <td><button type="button" class="btn btn-link btn-sm"></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="calendar-footer d-flex justify-content-between">
            <button type="button" class="btn btn-light btn-sm erase">삭제</button>
            <button type="button" class="btn btn-light btn-sm today">오늘</button>
        </div>
    </div>
</div>`;

    static #root = null;
    static #td = null;

    static {
        const parser = new DOMParser();

        DateUI.#all = parser.parseFromString(DateUI.#all, "text/html");
        DateUI.#root = DateUI.#all.querySelector("div.calendar");

        const div = DateUI.#root.querySelector("div.calendar-date");
        const tr = div.querySelector("tr");

        DateUI.#td = tr.querySelector("td");
        DateUI.#td = DateUI.#td.cloneNode(true);

        tr.remove();
    }

    static load(options) {
        const elements = document.querySelectorAll(`input[type="date"].form-control`);
        for(const element of elements) {
            new DateUI(element, typeof options === 'function' ? options(element) : options);
        }
    }

    #element = null;
    #options = null;
    #parent = null;
    #next = null;

    #calendar = null;
    #input = null;
    #form = null;
    #body = null;

    #hide() {
        if(this.#form.classList.contains("show")) {
            this.#form.classList.replace("show", "hide");
        } else {
            this.#form.classList.add("hide");
        }
        novemberizing.dom.children.remove(this.#body);
        const focus = novemberizing.date.month.begin(new Date());
        this.#form.setAttribute("data-focus-date", focus);
        const begin = novemberizing.date.week.begin(new Date(focus));
        const title = this.#form.querySelector("div.calendar-header button.month");
        title.textContent = novemberizing.date.month.str(focus);
    }

    #createDate(start, body, month, basis = null) {
        let date = new Date(start);
        for(let i = 0; i < 6; i++) {
            if(!body.querySelector(`tr[data-date="${date}"]`)) {
                const tr = document.createElement("tr");
                tr.setAttribute("data-date", date);
                for(let j = 0; j < 7; j++) {
                    const td = DateUI.#td.cloneNode(true);
                    const button = td.querySelector("button");
                    button.appendChild(document.createTextNode(date.getDate()));
                    const now = new Date(date);
                    button.addEventListener("click", e=> {
                        if(this.#form.classList.contains("show")) {
                            this.#form.classList.replace("show", "hide");
                        } else {
                            this.#form.classList.add("hide");
                        }
                        const focus = novemberizing.date.month.begin(new Date(now));
                        this.#form.setAttribute("data-focus-date", focus);
                        this.#input.setAttribute("value", novemberizing.date.str(now));
                        this.#input.setAttribute("data-date", now);
                        this.#element.setAttribute("value", novemberizing.date.str(now, '-'));
                    });
                    
                    tr.appendChild(td);

                    date = novemberizing.date.next(date);
                }
                body.insertBefore(tr, basis);
            } else {
                date = novemberizing.date.next(date, 7);
            }
        }
        date = new Date(start);
        const value = new Date(this.#input.getAttribute("data-date"));

        for(let i = 0; i < 6; i++) {
            const tr = body.querySelector(`tr[data-date="${date}"]`);
            let td = tr.querySelector("td");
            for(let j = 0; j < 7; j++) {
                const button = td.querySelector("button");
                button.classList.remove("active");
                button.classList.remove("fw-bold");
                if(date.getMonth() !== month) {
                    if(!button.classList.contains("not-current")) {
                        button.classList.add("not-current");
                    }
                } else {
                    if(button.classList.contains("not-current")) {
                        button.classList.remove("not-current");
                    }
                    if(novemberizing.date.equal(date,value)) {
                        button.classList.add("active");
                        button.classList.add("fw-bold");
                    }
                }
                date = novemberizing.date.next(date);
                td = td.nextElementSibling;
            }
        }
    }

    #scorll(element) {
        element.scrollIntoView({ behavior: "smooth" });
    }

    #up(e) {
        const focus = new Date(this.#form.getAttribute("data-focus-date"));
        const move = novemberizing.date.month.previous(new Date(focus));
        const start = novemberizing.date.week.begin(new Date(move));
        const begin = novemberizing.date.week.begin(novemberizing.date.month.begin(new Date(focus)));
        const basis = this.#body.querySelector(`tr[data-date="${begin}"]`);

        this.#createDate(start, this.#body, move.getMonth(), basis);
        this.#form.setAttribute("data-focus-date", move);

        const title = this.#form.querySelector("div.calendar-header button.month");
        title.textContent = novemberizing.date.month.str(move);

        this.#scorll(this.#body.querySelector(`tr[data-date="${start}"]`));
    }

    #down(e) {
        const focus = new Date(this.#form.getAttribute("data-focus-date"));
        const move = novemberizing.date.month.next(new Date(focus));
        const start = novemberizing.date.week.begin(new Date(move));
        const end = novemberizing.date.next(new Date(start), 42);
        const basis = this.#body.querySelector(`tr[data-date="${end}"]`);

        this.#createDate(start, this.#body, move.getMonth(), basis);
        this.#form.setAttribute("data-focus-date", move);

        const title = this.#form.querySelector("div.calendar-header button.month");
        title.textContent = novemberizing.date.month.str(move);

        this.#scorll(this.#body.querySelector(`tr[data-date="${start}"]`));
    }

    #position() {
        const rect = this.#input.getBoundingClientRect();

        this.#form.style.top = `${rect.top + rect.height + 5}px`;
        this.#form.style.left = `${rect.left + 5}px`;
    }

    #create(date) {
        const focus = novemberizing.date.month.begin(new Date(date));
        const begin = novemberizing.date.week.begin(new Date(focus));

        this.#calendar = DateUI.#root.cloneNode(true);
        const toggle = this.#calendar.querySelector("div.input-group button");
        this.#input = this.#calendar.querySelector("div.input-group input");
        this.#form = this.#calendar.querySelector("div.form");
        this.#body = this.#form.querySelector("div.form div.calendar-date tbody");

        const up = this.#form.querySelector("div.calendar-header button.up");
        up.addEventListener("click", e => this.#up(e));

        const down = this.#form.querySelector("div.calendar-header button.down");
        down.addEventListener("click", e => this.#down(e));

        const title = this.#form.querySelector("div.calendar-header button.month");
        title.textContent = novemberizing.date.month.str(focus);

        const today = this.#form.querySelector("div.calendar-footer button.today");

        today.addEventListener("click", e => {
            const now = new Date();
            const focus = novemberizing.date.month.begin(new Date(now));
            this.#form.setAttribute("data-focus-date", focus);
            this.#input.setAttribute("value", novemberizing.date.str(now));
            this.#input.setAttribute("data-date", now);
            this.#element.setAttribute("value", novemberizing.date.str(now, '-'));

            if(this.#form.classList.contains("show")) {
                this.#form.classList.replace("show", "hide");
            } else {
                this.#form.classList.replace("hide", "show");
                this.#position();
            }
        });
        const erase = this.#form.querySelector("div.calendar-footer button.erase");
        erase.addEventListener("click", e => {
            const now = new Date();
            const focus = novemberizing.date.month.begin(new Date(now));
            this.#form.setAttribute("data-focus-date", focus);
            this.#input.setAttribute("value", '');
            this.#input.setAttribute("data-date", '');
            this.#element.setAttribute("value", '');

            if(this.#form.classList.contains("show")) {
                this.#form.classList.replace("show", "hide");
            } else {
                this.#form.classList.replace("hide", "show");
                this.#position();
            }
        });

        this.#form.setAttribute("data-focus-date", focus);

        toggle.addEventListener("click", e => {
            if(this.#form.classList.contains("show")) {
                this.#form.classList.replace("show", "hide");

                novemberizing.dom.children.remove(this.#body);
                const focus = novemberizing.date.month.begin(new Date());
                this.#form.setAttribute("data-focus-date", focus);
                const begin = novemberizing.date.week.begin(new Date(focus));
                const title = this.#form.querySelector("div.calendar-header button.month");
                title.textContent = novemberizing.date.month.str(focus);
            } else if(this.#form.classList.contains("hide")) {
                novemberizing.dom.children.remove(this.#body);
    
                const focus = new Date(this.#form.getAttribute("data-focus-date"));
                const begin = novemberizing.date.week.begin(new Date(focus));
                const basis = this.#body.querySelector(`tr[data-date="${begin}"]`);
                this.#createDate(begin, this.#body, focus.getMonth(), basis);
                const title = this.#form.querySelector("div.calendar-header button.month");
                title.textContent = novemberizing.date.month.str(focus);
    
                this.#form.classList.replace("hide", "show");
                this.#position();
            }
        });

        this.#createDate(begin, this.#body, focus.getMonth());

        this.#parent.insertBefore(this.#calendar, this.#next);
    }

    constructor(element, options) {
        this.#element = element;
        this.#options = options;

        if(typeof this.#element === "string") this.#element = document.getElementById(this.#element);

        this.#parent = this.#element.parentNode;
        this.#next = this.#element.nextSibling;

        const value = this.#element.getAttribute("value") || this.#element.getAttribute("defaultValue");

        this.#create(value ? new Date(value) : new Date());

        this.#element.style.display = "none";
    }
}
