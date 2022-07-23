interface Veiculo {
    nome: string;
    placa: string;
    marca: string;
    modelo: string;
    cor: string;
    valor: string;
    entrada: Date | string;
}

(function(){
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function patio() {
        
        function add(veiculo: Veiculo, saveto?: boolean) {
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

            row.querySelector(".delete")!.addEventListener("click", function(){
                remove(this.dataset.placa);
            });
            
            $("#patio")?.appendChild(row);

            if(saveto) save([...read(), veiculo]);
        }
        
        function read(): Veiculo[] {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        
        function save(veiculos: Veiculo[]) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }

        function render() {
            $("#patio")!.innerHTML = "";
            const patio = read();

            if (patio.length) {
                patio.forEach((veiculo) => add(veiculo));
            }
        }

        function remove(placa: string) {
            const {entrada, nome} = read().find((veiculo) => veiculo.placa === placa);

            const temp = calcTemp(new Date().getTime() - new Date(entrada).getTime());

            if(confirm(`O veiculo de ${nome} permaneceu por ${temp}. Deseja encerrar o serviço?`)) return;

            save(read().filter((veiculo) => veiculo.placa !== placa));
            render();
        }

        function calcTemp (mil: number) {
            const min = Math.floor(mil / 60000);
            const seg = Math.floor((mil % 60000) / 1000);

            return `${min} minutos e ${seg} segundos`;
        }

        return {read, add, remove, save, render};
    }

    patio().render();

    $('#cadastrar')?.addEventListener('click', () => {
        const nome = $('#nome')?.value;
        const placa = $('#placa')?.value;
        const marca = $('#marca')?.value;
        const modelo = $('#modelo')?.value;
        const cor = $('#cor')?.value;
        const entrada = $('#entrada')?.value;
        const valor = $('#valor')?.value;

        if(!nome || !placa || !marca || !modelo|| !cor || !valor ){
            alert('Preencha todos os campos');
            return;
        }

        patio().add ({nome, placa, marca, modelo, cor, entrada: new Date().toISOString(), valor}, true);
        
    });

})();