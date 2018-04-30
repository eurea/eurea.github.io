function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function calcRolls(){
    //console.log(Math.floor($("#crystals").val() / 300));
    var date = new Date();
    date = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 365);
    document.cookie = 'crystals=' + $("#crystals").val() + ';expires=' + date.toGMTString() + ';';
    document.cookie = 'singles=' + $("#singles").val() + ';expires=' + date.toGMTString() + ';';
    document.cookie = 'tens=' + $("#tens").val() + ';expires=' + date.toGMTString() + ';';
    console.log(document.cookie);
    $("#total-rolls").val(Number(Math.floor($("#crystals").val() / 300)) + Number($("#singles").val()) + Number($("#tens").val() * 10));
    $("#percentage").val(~~(($("#total-rolls").val() / 300).toFixed(2) * 100) + "%");
}

function incrValueSSR() {
    var value = $("#ssr").val();
    value = isNaN(value) ? 0 : value;
    $("#ssr").val(++value);
}

function decrValueSSR() {
    var value = $("#ssr").val();
    value = isNaN(value) ? 0 : value;
    $("#ssr").val(--value); 
}

function incrValueMoons() {
    var value = $("#moons").val();
    value = isNaN(value) ? 0 : value;
    $("#moons").val(++value);
}

function decrValueMoons() {
    var value = $("#moons").val();
    value = isNaN(value) ? 0 : value;
    $("#moons").val(--value); 
}

$(document).ready(function(){

    $("#crystals").val(getCookie("crystals"));
    $("#singles").val(getCookie("singles"));
    $("#tens").val(getCookie("tens"));
    calcRolls();

    $("#bonus-info").popover({
        content:"Usually comes from Wonders and Elemental Skills.",
        trigger:"hover",
        placement:"bottom",
    });

    $(".trigger").on('input click',function(){
    	var exp_table = []
    	var max_level = 150;       
        //$("#cbBonus").prop('disabled', false);
    	if($("#bonus-exp").val() < 0){
    		$("#bonus-exp").val(0);
    	}
        if($("#rd-weapon").is(':checked')){
            $('.rank').fadeIn();
        	exp_table = [
	        	0,0,10,22,36,52,70,90,112,136,162,190,220,255,295,340,390,450,520,600,690,790,910,1050,1210,1390,1590,1810,2050,2310,2590,2890,3210,
	        	3550,3910,4290,4690,5110,5550,6010,6490,6990,7510,8050,8610,9190,9790,10410,11050,11710,12390,13090,13810,14550,15310,16090,16890,17710,
	        	18550,19410,20290,21190,22110,23050,24010,24990,25990,27010,28050,29110,30190,31290,32410,33550,34710,35890,37090,38310,39550,40810,42090,
	        	43990,44710,46050,47410,48790,50190,51610,53050,54510,55990,57490,59010,60550,62110,63690,65290,66910,68550,70210,71890,77090,82490,88090,
	        	93890,99890,106090,112490,119090,125890,132890,140090,147490,155090,162890,170890,179090,187490,196090,204890,213890,223190,232790,242690,
	        	252890,263490,274490,285990,297990,310490,323590,337290,351590,366490,382090,398390,415390,433090,451590,470890,490990,511990,533990,556990,
	        	580990,605990,631990,658990,686990,715990,745990
        	];
        }
        if($("#rd-char").is(':checked')){
            $('.rank').fadeIn();
        	max_level = 100;
        	exp_table = [
        		0,0,30,100,200,320,460,620,800,1000,1220,1460,1720,2000,2300,2650,3050,3500,4000,4550,5150,5800,6500,7300,8200,9200,10300,11500,12800,14200,15700,
        		17300,19000,20800,22700,24700,26800,29000,31400,34000,36800,39800,43000,46400,50000,53800,57800,62000,66400,71000,75800,80800,86050,91550,97300,103300,
        		109550,116050,122800,129800,137050,144550,152350,160450,168850,177550,186550,196050,206050,216550,227550,239050,251050,263550,276550,290050,304050,318550,
        		333550,349050,365050,415050,435050,456050,478050,501050,525050,550050,576050,603050,703050,853050,1053050,1303050,1603050,1953050,2353050,2803050,3303050,
        		3803050,4803050
        	];
        }
        if($("#rd-rank").is(':checked')){
            max_level = 200;
            $('.rank').fadeOut();
            //$("#cbBonus").prop('disabled', true);
            exp_table = [
                 0, 0, 50, 200, 500, 900, 1500, 2200, 2900, 3800, 4900, 6500, 8000, 9600, 11500, 13500, 15600, 17800, 20100, 22950, 26500, 30450, 34450, 38900, 43850, 49350, 
                 55450, 62200, 69650, 77850, 86850, 96700, 107450, 119150, 131850, 145600, 160450, 176450, 193650, 212100, 231850, 252950, 275450, 299400, 324850, 351850, 380450, 
                 410700, 442650, 476350, 511850, 549200, 588450, 629650, 672850, 718100, 765450, 814950, 866650, 920600, 976850, 1035450, 1096450, 1159900, 1225850, 1294350, 
                 1365450, 1439200, 1515650, 1594850, 1676850, 1761700, 1849450, 1940150, 2033850, 2130600, 2230450, 2333450, 2439650, 2549100, 2661850, 2777950, 2897450, 
                 3020400, 3146850, 3276850, 3410450, 3547700, 3688650, 3833350, 3981850, 4134200, 4290450, 4450650, 4614850, 4783100, 4955450, 5131950, 5312650, 5497600, 
                 5686850, 5936850, 6197000, 6467400, 6748300, 7039900, 7342400, 7656000, 7980900, 8317300, 8665400, 9025400, 9397500, 9781900, 10178800, 10588400, 11010900, 
                 11446500, 11895400, 12357800, 12833900, 13323900, 13828000, 14346400, 14879300, 15426900, 15989400, 16567000, 17159900, 17768300, 18392400, 19032400, 
                 19688600, 20361300, 21050800, 21757400, 22481400, 23223100, 23982800, 24760800, 25557400, 26372900, 27207600, 28061800, 28935800, 29829800, 30744200, 
                 31679400, 32635800, 33613800, 34613800, 35636300, 36682800, 37754800, 38853800, 39981800, 41141800, 42336800, 43571800, 44851800, 46181800, 47571800, 
                 49031800, 50571800, 52201800, 53931800, 55781800, 57771800, 59921800, 62251800, 64781800, 67531800, 70541800, 73821800, 77371800, 81276800, 85197800, 
                 89136300, 93092800, 97069300, 101067800, 105091300, 109142800, 113227300, 117349800, 121515300, 125733800, 130015300, 134369800, 138807300, 143337800, 
                 147981300, 152757800, 157687300, 162789800, 168085300, 173598800, 179355300, 185379800, 191697300, 198332800
            ];
        }
        if($("#target-from").val() > max_level) {
            $("#target-from").val(1);
        }
        if($("#target-to").val() > max_level) {
            $("#target-to").val(40);
        }
        // main computation
        var current_exp = 0;
        if(parseInt($("#next-level").val()) > 0){
            current_exp = (exp_table[parseInt($("#target-from").val()) + 1] - exp_table[parseInt($("#target-from").val())]) - parseInt($("#next-level").val());
        }
        console.log("TO:" + $("#target-to").val());
        console.log("EXP TO:" + exp_table[$("#target-to").val()]);
        if ($("#target-from").val() <= max_level && $("#target-to").val() <= max_level){
            var total_exp = exp_table[$("#target-to").val()] - exp_table[$("#target-from").val()] - current_exp;
            var bonus_exp = $("#bonus-exp").val();
            var angel_per_exp = 100;
            var arch_per_exp = 500;

            if($("#cbBonus").is(':checked')){
                angel_per_exp = 150;
                arch_per_exp = 750
            }
            if( ! $("#rd-rank").is(':checked')){
                $("#angel").val(Math.ceil(total_exp / (angel_per_exp + Math.floor(angel_per_exp*(bonus_exp/100)))));
                $("#archangel").val(Math.ceil(total_exp / (arch_per_exp + Math.floor(arch_per_exp*(bonus_exp/100)))));
            }
            $("#total-exp").val(total_exp);
        }        

        // error popups
        if($("#total-exp").val() < 0){
            $("#error-content").html("You cannot downgrade weapons/summons/characters.");
            $("#error-message").show();
        }
        else{
            $("#error-message").hide();
            $("#error-content").html("");
        }
    });
    
    $(".trigger-crystal").on('input click', calcRolls);
});