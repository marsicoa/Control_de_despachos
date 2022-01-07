const fetch = require("cross-fetch");
const fs = require("fs");

let repartos = [];

class Control {
  //guarda el bulto controlado
  guardar(code) {
    const recuperarBulto = async () => {
      try {
        const res = await fetch(
          `http://app.sumed.local.com:5984/dispatches/_design/docs/_view/records`,
          {
            method: "GET",
            headers: { Authorization: "Basic YWRtaW46YWRtaW4=" },
          }
        );
        const data = await res.json();
        return data.rows;
      } catch (err) {
        console.log(err);
      }
    };

    const guardarBulto = async () => {
      try {
        let bultos = await recuperarBulto().then((res) => {
          return res;
        });

        const fyh = new Date().toLocaleString();
        const res = await fetch(
          `http://app.sumed.local.com:5984/dispatches/${code}`,
          {
            method: "PUT",
            headers: { Authorization: "Basic YWRtaW46YWRtaW4=" },
            body: JSON.stringify({ id: ++bultos.length, code: code }),
          }
        );
        console.log(`[${fyh}] Se contabilizo el bulto ${code}`);
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    let response = guardarBulto().then((res) => res);
    return response;
  }

  //lista los bultos controlados
  listar() {
    const recuperarBulto = async () => {
      try {
        const res = await fetch(
          `http://app.sumed.local.com:5984/dispatches/_design/docs/_view/records`,
          {
            method: "GET",
            headers: { Authorization: "Basic YWRtaW46YWRtaW4=" },
          }
        );
        const data = await res.json();
        return data.rows;
      } catch (err) {
        console.log(err);
      }
    };

    let response = recuperarBulto().then((res) => {
      return res;
    });
    return response;
  }

  //elimina un bulto segun su id
  eliminar(id, _rev) {
    const eliminarBultoId = async () => {
      try {
        const fyh = new Date().toLocaleString();
        const res = await fetch(
          `http://app.sumed.local.com:5984/dispatches/${id}?rev=${_rev}`,
          {
            method: "DELETE",
            headers: { Authorization: "Basic YWRtaW46YWRtaW4=" },
          }
        );
        const data = await res.json();
        console.log(
          `[${fyh}] Se elimino el bulto con {id: ${id} - _rev: ${_rev}}`
        );
        return data.rows;
      } catch (err) {
        console.log(err);
      }
    };

    let response = eliminarBultoId().then((res) => {
      return res;
    });
    return response;
  }

  //elimina todo e inicia un nuevo conteo
  nuevo() {
    const recuperarBulto = async () => {
      try {
        const res = await fetch(
          `http://app.sumed.local.com:5984/dispatches/_design/docs/_view/records`,
          {
            method: "GET",
            headers: { Authorization: "Basic YWRtaW46YWRtaW4=" },
          }
        );
        const data = await res.json();
        return data.rows;
      } catch (err) {
        console.log(err);
      }
    };

    const eliminarTodo = async () => {
      let bultos = await recuperarBulto().then((res) => {
        return res;
      });

      bultos.forEach(async (el) => {
        const res = await fetch(
          `http://app.sumed.local.com:5984/dispatches/${el.id}?rev=${el.value._rev}`,
          {
            method: "DELETE",
            headers: { Authorization: "Basic YWRtaW46YWRtaW4=" },
          }
        );
        const data = await res.json();
        return data.rows;
      });
    };

    let response = eliminarTodo().then((res) => {
      return res;
    });
    return response;
  }

  //recupera los codigos de reparto (zona y sub-zona)
  reparto() {
    const recuperarReparto = async () => {
      try {
        let data = [];
        const res = await fs.promises.readFile(
          "../app-conteo/public/txt/repartos.txt",
          "UTF-8"
        );
        data = JSON.parse(res);
        return data;
      } catch (err) {
        console.log(err);
      }
    };

    let response = recuperarReparto().then((data) => {
      repartos = [];
      data.forEach((el) => {
        repartos.push(el);
      });
      return repartos;
    });
    return response;
  }
}

module.exports = Control;
