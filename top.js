define(["jquery","jquery-cookie"], function($){
    function hover(node){
        node.mouseenter(function(){
            $("#tleft a" ).css("color","#fff");
            $(this).css("color","red").mouseleave(function(){
                $(this).css("color","#fff");
            });
        })
    }
    function slide(){
        var oUl = $("#tcenter ul");
        var lis = oUl.find("li");
        var num = 0;
        var timer = null;
        timer = setInterval(function(){
            num++;
            tab();
        },2000)
        function tab(){
            lis.removeClass("active").mouseenter(function(){
                $(this).addClass("active");
            })
            oUl.animate({top:-num*30},1000,function(){
                if(num == lis.size()-1){
                    num = 0;
                    oUl.css("top",0);
                }
            })
        }
        $(lis).mouseenter(function(){
            clearInterval(timer);
        })
        $(lis).mouseleave(function(){
            $(this).removeClass("active");
            timer = setInterval(function(){
                num++;
                tab();
            },2000);
        })
    }
    function myOrder(){
        $("#tright .first").mouseenter(function(){
            $("#tright .first").find(".r-icon").css("background-position","-3px -12px");
            $(".order").css({
                display:"block",
                
            })

            $(".order").mouseenter(function(){
                $("#tright .first").find(".r-icon").css("background-position","-3px -12px");
                $(".order").css("display","block");
                $(".order a").mouseenter(function(){
                    $(this).css("color","red");
                }).mouseleave(function(){
                    $(this).css("color","#000");
                })
            }).mouseleave(function(){
                $(this).css("display","none");
                $("#tright .first").find(".r-icon").css("background-position","-3px -16px");
            })
        }).mouseleave(function(){
            $(".order").css("display","none");
            $("#tright .first").find(".r-icon").css("background-position","-3px -16px");
        })
    }
    function snHover(){
        $(".searchwrap a").mouseenter(function(){
            $("#tleft a" ).css("color","#fff");
            $(this).css("color","red").mouseleave(function(){
                $(this).css("color","#acacac");
            });
        })
        $(".nav-menu").on("mouseenter","a",function(){
            $("#tleft a" ).css("color","#fff");
            $(this).css("color","red").mouseleave(function(){
                $(this).css("color","#000");
            });
        })
    }
    function shopbag(){
        $(".shopping").mouseenter(function(){
            $(this).css({
                borderBottom:"none",
            });
            $(".shopbag").show().mouseenter(function(){
                $(this).show();
                $(".shopping").css("border-bottom","none");
            }).mouseleave(function(){
                $(this).hide();
                $(".shopping").css("border-bottom","1px solid #ddd");
            })
        }).mouseleave(function(){
            $(this).css({
                borderBottom:"1px solid #ddd",
            });
            $(".shopbag").hide();
        })
    }
    function bannerTab(){
        var timer = null;
        var iNow = 0;
        var btns = $(".tabbtn span");
        var lis = $(".tab .img").find("li");
        timer = setInterval(function(){
            iNow++;
            btab();
        },2000);
        function btab(){
            btns.removeClass("active").eq(iNow).addClass("active");
            lis.fadeTo(300,0.2).hide().eq(iNow).fadeTo(300,1);
            if(iNow == lis.size()-1){
                iNow = -1;
            }
        }
        
        $(".tab .img").mouseenter(function(){
            clearInterval(timer);
            $(".lbtn").show();
            $(".rbtn").show();
            // $(".tab .btns").click(function(){
            //     // $(this).show();
            //     // alert($(this).html());
            //     if($(this).html() == "&lt;"){
            //         if(iNow == lis.size()-1){
            //             iNow = 0;
            //             btab();
            //         }else{
            //             iNow++;
            //             btab();
            //         }
                    
                    
            //     }
            //     if($(this).html() == "&gt;"){
            //         if(iNow == 0){
            //             iNow = lis.size()-1;
            //             btab();
            //         }else{
            //             iNow--;
            //             btab();
            //         }
                    
                    
            //     }
            // })
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                btab();
            },2000);
            $(".lbtn").hide();
            $(".rbtn").hide();
        })
        // $(".btns").mouseenter(function(){
        //     $(".btns"),show();
        // })
        
    }
    
        
    
    function download(){
        $.ajax({
            type:"get",
            url:"../json/data.json",
            
            success:function(obj){
                var node1 = $(`<img src="${obj.search[0].link}" alt="">`)
                node1.appendTo($(".search .logo"));
                // 输入框轮播
                var arr1= obj.search[1].slideword;
                var timer = null;
                var i = 0;
                timer = setInterval(function(){
                    i++;
                    tabplace();
                    if(i == arr1.length -1){
                        i = -1;
                    }
                },2000)
                function tabplace(){
                    $(".search .txt").attr({
                        placeholder : arr1[i]
                    })
                }
                $(".search .txt").focus(function(){
                    clearInterval(timer);
                }).blur(function(){
                    timer = setInterval(function(){
                        i++;
                        tabplace();
                    },2000);
                })
                // banner图加载
                var arr2 = obj.tab
                for(var j = 0; j < arr2.length; j++){
                    var node2 = $(`<li><a href="${arr2[j].link}"><img src="${arr2[j].img}" alt=""></a></li>`)
                    node2.appendTo($(".tab .img"));
                    var node3 = $(`<span class = "${j == 0 ? "active" : ""}"></span>`);
                    node3.appendTo($(".tab .tabbtn"));
                }
               
                bannerTab();
                // 导航条
                var arr3 = obj.nav[1].items;
                for(var k = 0; k < arr3.length; k++ ){
                    var noden = $(`<li><a href="${arr3[k].link}">${arr3[k].name}</a></li>`);
                    noden.appendTo($(".nav .nav-menu"));
                }
                // 轮播图下方小图加载
                var arr4 = obj.underTab;
                for(var s = 0; s < arr4.length; s++){
                    var nodeu = $(`<li><a href="${arr4[s].link}"><img src="${arr4[s].img}" alt=""></a></li>`)
                    nodeu.appendTo($(".under-tab .simg"));
                }
                

            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function sideDownload(){
        $.ajax({
            type:"get",
            url:"../json/data.json",
            success:function(obj){
                var sideArr = obj.sidebar;
                for(var i = 0; i < sideArr.length; i++){
                    var childArr = sideArr[i].child
                        var nodeli = $(`<li>
                    <div class="leftside">
                        <aside><a href="${i == 0 ? "" :sideArr[i].title.link}">${sideArr[i].title.name}</a></aside>
                    </div>
                    
                </li>
                `) 
                nodeli.appendTo($(".sidebar"));
                
                if(i == 8){
                   var node8 = $(`<section><a href="${sideArr[i].subtitle[0].link}">${sideArr[i].subtitle[0].name}</a>`).appendTo($(".sidebar").find(".leftside").eq(i));
                }else{
                   var node9 = $(`<section><a href="${sideArr[i].subtitle[0].link}">${sideArr[i].subtitle[0].name}</a>&nbsp;&nbsp;<a href="${sideArr[i].subtitle[1].link}">${sideArr[i].subtitle[1].name}</a></section>`).appendTo($(".sidebar").find(".leftside").eq(i));
                }
                var nodecard = $(`
                <div class="card">
                        <div class="select">
                            <h2>${sideArr[i].title.name}</h2>
                            <div class="listbox">
                                <div class="div1">
                                </div>
                                <div class="div2">
                                </div>
                                <div class="div3">
                                </div>
                            </div>
                        </div>
                        <div class="bannerb">
                            
                        </div>
                        <div class="bigban">
                        </div>
                    </div>
               `)
                nodecard.appendTo($(".sidebarbox .cardbox"));
                if(i == 2 ){
                    var nodeb1 = $(`<a id ="#aa1" href="${sideArr[i].child[childArr.length-1].bigimages[0].link}"><img src="${sideArr[i].child[childArr.length-1].bigimages[0].img}" alt=""></a>
                    <a id ="#aa2" href="${sideArr[i].child[childArr.length-1].bigimages[1].link}"><img src="${sideArr[i].child[childArr.length-1].bigimages[1].img}" alt=""></a>
                    `).appendTo($(".sidebarbox .cardbox").find(".bigban").eq(i));
                }else if(i ==3){
                    var nodeb3 = $(`<a id ="#aa3" href="${sideArr[i].child[childArr.length-1].bigimages[0].link}"><img src="${sideArr[i].child[childArr.length-1].bigimages[0].img}" alt=""></a>
                    <a id ="#aa4" href="${sideArr[i].child[childArr.length-1].bigimages[1].link}"><img src="${sideArr[i].child[childArr.length-1].bigimages[1].img}" alt=""></a>
                    `).appendTo($(".sidebarbox .cardbox").find(".bigban").eq(i));
                }else{
                    var nodeb2 = $(`<a href="${sideArr[i].child[childArr.length-1].bigimages[0].link}"><img src="${sideArr[i].child[childArr.length-1].bigimages[0].img}" alt=""></a>`).appendTo($(".sidebarbox .cardbox").find(".bigban").eq(i));
                }
                if(i == 0 || i ==1 || i == 4){
                    for(var j = 0; j < childArr.length-1; j++ ){
                        var contentArr = childArr[j].content;
                        if( j < 2){
                            var nodediv11 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div1")));
                            var id = childArr[j].id;
                            for(var l = 0; l < contentArr.length; l++){
                                var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div1").find("dl").eq(id))
                            }
                            
                        }
                    }
                }else{
                    for(var j = 0; j < childArr.length-1; j++ ){
                        var contentArr = childArr[j].content;
                        if( j < 1){
                            var nodediv11 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div1")));
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div1").find("dl").eq(id))
                        }
                            
                        }
                    }
                } 
                if(i == 0){
                    for(var j = 0; j < childArr.length-1; j++ ){
                        var contentArr = childArr[j].content;
                        if( j > 1 && j <6){
                            var nodediv21 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div2")));
                            
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div2").find("dl").eq(id))
                        }
                            
                        }
                        if( j >5){
                            var nodediv31 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div3")));
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div3").find("dl").eq(id))
                        }
                        }
                    }
                }
                if(i == 1){
                    for(var j = 0; j < childArr.length-1; j++ ){
                        var contentArr = childArr[j].content;
                        if( j > 1 && j <4){
                            var nodediv21 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div2")));
                            
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div2").find("dl").eq(id))
                        }
                            
                        }
                        if( j >3){
                            var nodediv31 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div3")));
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div3").find("dl").eq(id))
                        }
                        }
                    }
                }
                if(i == 2){
                    for(var j = 0; j < childArr.length-1; j++ ){
                        var contentArr = childArr[j].content;
                        if( j > 0 && j <3){
                            var nodediv21 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div2")));
                            
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div2").find("dl").eq(id))
                        }
                            
                        }
                        if( j >2){
                            var nodediv31 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div3")));
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div3").find("dl").eq(id))
                        }
                        }
                    }
                }
                if(i == 3){
                    for(var j = 0; j < childArr.length-1; j++ ){
                        var contentArr = childArr[j].content;
                        if( j > 0 && j <2){
                            var nodediv21 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div2")));
                            
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div2").find("dl").eq(id))
                        }
                        }
                        if( j >1){
                            var nodediv31 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div3")));
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div3").find("dl").eq(id))
                        }
                        }
                    }
                }
                if(i == 4){
                    for(var j = 0; j < childArr.length-1; j++ ){
                        var contentArr = childArr[j].content;
                        if( j > 1 && j <3){
                            var nodediv21 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div2")));
                            
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div2").find("dl").eq(id))
                        }
                            
                        }
                        if( j >2){
                            var nodediv31 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div3")));
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div3").find("dl").eq(id))
                        }
                        }
                    }
                }
                if(i == 5){
                    for(var j = 0; j < childArr.length-1; j++ ){
                        var contentArr = childArr[j].content;
                        if( j > 0 && j <2){
                            var nodediv21 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div2")));
                            
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div2").find("dl").eq(id))
                        }
                        }
                        if( j >1){
                            var nodediv31 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div3")));
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div3").find("dl").eq(id))
                        }
                        }
                    }
                }
                if(i == 6){
                    for(var j = 0; j < childArr.length-1; j++ ){
                        var contentArr = childArr[j].content;
                        if( j > 0 && j <3){
                            var nodediv21 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div2")));
                            
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div2").find("dl").eq(id))
                        }
                            
                        }
                        if( j >2){
                            var nodediv31 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div3")));
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div3").find("dl").eq(id))
                        }
                        }
                    }
                }
                if(i == 7){
                    for(var j = 0; j < childArr.length-1; j++ ){
                        var contentArr = childArr[j].content;
                        if( j > 0 && j <2){
                            var nodediv21 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div2")));
                            
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div2").find("dl").eq(id))
                        }
                            
                        }
                        if( j >1){
                            var nodediv31 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div3")));
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div3").find("dl").eq(id))
                        }
                        }
                    }
                }
                if(i == 8){
                    for(var j = 0; j < childArr.length-1; j++ ){
                        var contentArr = childArr[j].content;
                        if( j > 0 && j <2){
                            var nodediv21 = $(`<dl>
                            <dt>${childArr[j].name}</dt>
                        </dl>`).appendTo($(".cardbox").find($(".card")).eq(i).find($(".div2")));
                            
                        var id = childArr[j].id;   
                        for(var l = 0; l < contentArr.length; l++){
                            var nodedd = $(`<dd><a href="${contentArr[l].link}">${contentArr[l].sword}</a></dd>`).appendTo($(".cardbox").find(".card").eq(i).find(".div2").find("dl").eq(id))
                        }
                        }
                        
                    }
                }
                    
                    var imgArr = sideArr[i].child[childArr.length-1].images;
                    for(var k =0; k < 4; k++){
                        var imgnode = $(`<a href="${imgArr[k].link}"><img src="${imgArr[k].img}" alt=""></a>
                        `)
                        imgnode.appendTo($(".sidebarbox .cardbox").find(".bannerb").eq(i));
                    }
                   
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    };
    function sideEvent(){
        $(".sidebox").find("a").mouseenter(function(){
           $(this).css("color","red");
        })
    }
    return{
        hover:hover,
        slide:slide,
        myOrder:myOrder,
        snHover:snHover,
        shopbag:shopbag,
        download:download,
        sideDownload:sideDownload,
        sideEvent:sideEvent
    }
})
