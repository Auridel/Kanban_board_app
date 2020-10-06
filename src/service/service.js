export default class Service {
    constructor(){
        this._server = "http://localhost:3000"
    }

    async getResource (url){
        const res = await fetch(`${this._server}${url}`);
        if(!res.ok) throw new Error();

        return await res.json();
    }

    async getColumns (){
        return await this.getResource("/entries/");
    }
}