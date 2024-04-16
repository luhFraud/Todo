import { format, formatDate, isDate } from "date-fns";

export class Task {

    //Constructor for task objects
    constructor(name, description, date, status = false) {
        this._name = name;
        this._description = description;
        this._date = isDate(date) ? date : new Date();
        this._status = status
    }

    //Getters
    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }
    
    get date() {
        return this._date;
    }

    get status() {
        return this._status;
    }

    //Setters
    set name(name) {
        this._name = name;
    }

    set description(description) {
        this._description = description;
    }

    set date(date) {
        this._date = date;
    }

    set status(status) {
        this._status = status;
    }

    //Funcations for task objects
    getFormattedDate() {
        return format(this._date, "yyyy-MM-dd");
    }
}