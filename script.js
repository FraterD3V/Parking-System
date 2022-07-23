(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function patio() {
        function add(veiculo, saveto) {
            var _a;
            const row = document.createElement('tr');
            row.innerHTML = ` 
            <td>${veiculo.nome}</td>
            <td>${veiculo.placa}</td>
            <td>${veiculo.marca}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.cor}</td>
            <td>${veiculo.valor}</td>
            <td>${veiculo.entrada}</td>
            
            <td><button class="delete" data-placa="${veiculo.placa}">Delete</button></td>
            `;
            row.querySelector(".delete").addEventListener("click", function () {
                remove(this.dataset.placa);
            });
            (_a = $("#patio")) === null || _a === void 0 ? void 0 : _a.appendChild(row);
            if (saveto)
                save([...read(), veiculo]);
        }
        function read() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function save(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function render() {
            $("#patio").innerHTML = "";
            const patio = read();
            if (patio.length) {
                patio.forEach((veiculo) => add(veiculo));
            }
        }
        function remove(placa) {
            const { entrada, nome } = read().find((veiculo) => veiculo.placa === placa);
            const temp = calcTemp(new Date().getTime() - new Date(entrada).getTime());
            if (confirm(`O veiculo de ${nome} permaneceu por ${temp}. Deseja encerrar o serviço?`))
                return;
            save(read().filter((veiculo) => veiculo.placa !== placa));
            render();
        }
        function calcTemp(mil) {
            const min = Math.floor(mil / 60000);
            const seg = Math.floor((mil % 60000) / 1000);
            return `${min} minutos e ${seg} segundos`;
        }
        return { read, add, remove, save, render };
    }
    patio().render();
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        const marca = (_c = $('#marca')) === null || _c === void 0 ? void 0 : _c.value;
        const modelo = (_d = $('#modelo')) === null || _d === void 0 ? void 0 : _d.value;
        const cor = (_e = $('#cor')) === null || _e === void 0 ? void 0 : _e.value;
        const entrada = (_f = $('#entrada')) === null || _f === void 0 ? void 0 : _f.value;
        const valor = (_g = $('#valor')) === null || _g === void 0 ? void 0 : _g.value;
        if (!nome || !placa || !marca || !modelo || !cor || !valor) {
            alert('Preencha todos os campos');
            return;
        }
        patio().add({ nome, placa, marca, modelo, cor, entrada: new Date().toISOString(), valor }, true);
    });
})();
