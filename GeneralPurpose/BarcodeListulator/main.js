const isHeading = (line) => line[0] === "#";
const isSubHeading = (line) => line.slice(0,2) === "##";

window.onload = () => {
    console.log(".");

    const groups = [];
    
    document.getElementById("deli").addEventListener("click", (ev) => {
        document.getElementById("data").value = deli_data;
    });

    document.getElementById("storeSupplies").addEventListener("click", (ev) => {
        document.getElementById("data").value = storeSupplies_data;
    });

    document.getElementById("deliSupplies").addEventListener("click", (ev) => {
        document.getElementById("data").value = deli_supplies_data;
    });

    document.getElementById("submit").addEventListener("click", (ev) => {
        // console.log(document.getElementById("data").value);
        const data = document.getElementById("data").value.split("\n");

        document.body.innerHTML = "";
        
        if (data[0] != undefined) {
            const title = document.createElement("h1");
            title.innerText = data[0];
            document.body.appendChild(title);
            document.title = data[0];
        }

        for (let i = 1; i < data.length; i++) {
            if (data[i] === undefined || data[i] === "") continue;
            if (isHeading(data[i])) {
                if (data[i] === undefined || data[i] === "") continue;

                // This is a headline, start a new UPC group
                let heading;
                if (isSubHeading(data[i])) {
                    console.log("hah");
                    heading = document.createElement("h4");
                    heading.innerText = data[i].trim().replace("## ", "");
                } else {
                    heading = document.createElement("h2");
                    heading.innerText = data[i].trim().replace("# ", "");
                }
                document.body.appendChild(heading);
                const div_upc_group = document.createElement("div");
                div_upc_group.classList.add("flex");

                while (data[++i] && !isHeading(data[i]) && i < data.length) {
                    console.log(data[i]);
                    if (data[i] === undefined) continue;
                    const [upc, title, desc] = data[i].split(",");
                    if (!upc) continue;

                    const div_item = document.createElement("div");
                    div_item.classList.add("flex-item");

                    const p_barcode = document.createElement("p");
                    if (upc.length === 12 || upc.length === 13) {
                        p_barcode.innerText = upc
                    }
                    else if (upc.length === 11) {
                        p_barcode.innerText = upc + "?"
                    }
                    else if (upc.length === 10) {
                        p_barcode.innerText = "0" + upc + "?"
                    }
                    p_barcode.classList.add("barcode");
                    div_item.appendChild(p_barcode);

                    if (title) {
                        const p_title = document.createElement("p");
                        p_title.innerText = title;
                        div_item.appendChild(p_title);
                    }

                    if (desc) {
                        const p_desc = document.createElement("p");
                        p_desc.innerText = desc;
                        div_item.appendChild(p_desc);
                    }

                    div_upc_group.appendChild(div_item);
                }
                document.body.appendChild(div_upc_group);
                --i;
            }
        }
    });
};

const deli_data = `%DELI%`
const storeSupplies_data = `%STORESUPPLIES%`
const deli_supplies_data = `%DELISUPPLIES%`