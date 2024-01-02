window.location = "#home";
function send(link) {
    let req = new XMLHttpRequest();
    req.open("GET", `http://127.0.0.1:8000/send/${link}`, true);
    req.send(true);
    req.onload = function() {refresh()}
}
function refresh() {
    //let data
    let req = new XMLHttpRequest();
    req.open("GET", "http://127.0.0.1:8000/get", true);
    //req.responseType = "text";
    req.send();
    req.onload = function() {
        var data = req.responseText;
        obj = JSON.parse(data)
        data = data.substring(1,(data.length-1))
        console.log(obj)
        if (data.length == 0) {
            console.log("Server Error");
        } else {
            on_arr = ["0_on", "1_on", "2_on", "3_on", "4_on", "5_on", "6_on",
            "7_on", "8_on", "9_on", "10_on", "11_o", "12_o", "13_o"]
            off_arr = ["0_off", "1_off", "2_off", "3_off", "4_off", "5_off", "6_off",
            "7_off", "8_off", "9_off", "10_off", "11_c", "12_c", "13_c"]
            obj_arr = [obj.L0, obj.L1, obj.L2, obj.L3, obj.L4, obj.L5, obj.L6, obj.L7,
            obj.L8, obj.L9, obj.L10, obj.L11, obj.L12, obj.L13]
            DHT_arr = ["DHT0", "DHT1", "DHT2", "DHT3", "DHT4", "DHT5"]
            dht_obj_arr = [obj.D0, obj.D1, obj.D2, obj.D3, obj.D4, obj.D5]
            // document.getElementById("DHT1").innerHTML = data.substring(18, 21)
            // document.getElementById("DHT2").innerHTML = data.substring(21, 24)
            // document.getElementById("DHT3").innerHTML = data.substring(24, 27)
            for (let i = 0; i<obj.L_len; i++) {
            //     if (data[i] == 0) {
            //         document.getElementById(on_arr[i]).style.display = "none";
            //         document.getElementById(off_arr[i]).style.display = "block";
            //     } else {
            //         document.getElementById(off_arr[i]).style.display = "none";
            //         document.getElementById(on_arr[i]).style.display = "block";
            //     }
                if (obj_arr[i] == 0) {
                    document.getElementById(on_arr[i]).style.display = "none";
                    document.getElementById(off_arr[i]).style.display = "block";
                } else {
                    document.getElementById(on_arr[i]).style.display = "block";
                    document.getElementById(off_arr[i]).style.display = "none";
                }
            }
            for (let i = 0; i<obj.D_len; i++) {
                document.getElementById(DHT_arr[i]).innerHTML = dht_obj_arr[i];
            }
        }
    };
    
}
refresh()
setInterval(refresh, 500);