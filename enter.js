require.config({
    paths:{
        "jquery":"jquery-1.10.1.min",
        "jquery-cookie":"jquery.cookie",
        "top":"top",
    },
    shim:{
        "jquery-cookie": ["jquery"]
    }
})
require(["top"],function(top){
    top.download();
    top.hover($("#tleft a"));
    top.slide();
    top.hover($("#tright span a"));
    top.myOrder();
    top.snHover();
    top.shopbag();
    top.sideDownload();
    top.sideEvent();
})