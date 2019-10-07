import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    _baseUrl = "";
    constructor() {
        this._baseUrl = "http://dev.bulbulstudio.com:4040/";
    }
}