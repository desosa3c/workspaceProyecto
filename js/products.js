const categorias = "https://japceibal.github.io/emercado-api/cats/cat.json";

let getJSONData = function (categorias) {
    let result = {};
    showSpinner();
    return fetch(categorias)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}


document.getElementById()