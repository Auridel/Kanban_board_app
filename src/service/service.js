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

    async addColumn(payload){
        const message = JSON.stringify(payload);
        const res = await fetch(`${this._server}/entries/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: message
        });
        if(!res.ok) throw new Error();
        return res;
    }

    async deleteColumn(id){
        return await fetch(`${this._server}/entries/${id}`,{
            method: "DELETE"
        });
    }

    async addCard(colId, body){
        const message = JSON.stringify(body);
        const res = await fetch(`${this._server}/entries/${colId}/cards/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: message
        });
        if(!res.ok) throw new Error();

        return res;
    }
}