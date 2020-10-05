export default class Service {
    constructor(){
        this.server = "http://localhost:3000/"
    }

    async getResource (url){
        const res = await fetch(`${this.server}${url}`);
        if(!res.ok) throw new Error();

        return await res.json();
    }

    async getColumns (){
        return await this.getResource("entries");
    }
}