export default class Service {
    constructor(){
        this._server = `http://${window.location.hostname}:3005`
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
        return await res.json();
    }

    async deleteColumn(id){
        return await fetch(`${this._server}/entries/${id}`,{
            method: "DELETE"
        });
    }

    async updateColumn(colId, body){
        const message = JSON.stringify(body);
        const res = await fetch(`${this._server}/entries/${colId}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: message
        });
        if(!res.ok) throw new Error();
        return await res.json();
    }
}