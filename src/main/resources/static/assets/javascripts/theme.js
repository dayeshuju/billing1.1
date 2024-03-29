(function() {
    $(document).ready(function() {
        setScrollable();
        setTimeAgo();
        setAutoSize();
        setCharCounter();
        setMaxLength();
        setValidateForm();
        setSortable($(".sortable"));
        //setSelect2();
        $(".datetimepicker").datetimepicker();
        $(".datepicker").datetimepicker({
            pickTime: false
        });
        $(".timepicker").datetimepicker({
            pickDate: false
        });
        $('.wysihtml5').wysihtml5();
        $('.dd').nestable();
        $('.nav-responsive.nav-pills, .nav-responsive.nav-tabs').tabdrop();
        $("input.nakedpassword").nakedPassword({
            path: "assets/images/plugins/naked_password/"
        });
        setDataTable($(".data-table"));
        setDataTable($(".data-table-column-filter")).columnFilter();
        $(".box .box-remove").click(function(e) {
            $(this).parents(".box").first().remove();
            return e.preventDefault();
        });
        $(".box .box-collapse").click(function(e) {
            var box;

            box = $(this).parents(".box").first();
            box.toggleClass("box-collapsed");
            return e.preventDefault();
        });
        $("body").on("mouseenter", ".has-popover", function() {
            var el;

            el = $(this);
            if (el.data("popover") === undefined) {
                el.popover({
                    placement: el.data("placement") || "top",
                    container: "body"
                });
            }
            return el.popover("show");
        });
        $("body").on("mouseleave", ".has-popover", function() {
            return $(this).popover("hide");
        });
        $("body").on("mouseenter", ".has-tooltip", function() {
            var el;

            el = $(this);
            if (el.data("tooltip") === undefined) {
                el.tooltip({
                    placement: el.data("placement") || "top",
                    container: "body"
                });
            }
            return el.tooltip("show");
        });
        $("body").on("mouseleave", ".has-tooltip", function() {
            return $(this).tooltip("hide");
        });
        $("#check-all").click(function() {
            return $(this).parents("table:eq(0)").find(".only-checkbox :checkbox").attr("checked", this.checked);
        });
        $(".colorpicker-hex").colorpicker({
            format: "hex"
        });
        $(".colorpicker-rgb").colorpicker({
            format: "rgb"
        });
        if (!Modernizr.input.placeholder) {
            $("[placeholder]").focus(function() {
                var input;

                input = $(this);
                if (input.val() === input.attr("placeholder")) {
                    input.val("");
                    return input.removeClass("placeholder");
                }
            }).blur(function() {
                var input;

                input = $(this);
                if (input.val() === "" || input.val() === input.attr("placeholder")) {
                    input.addClass("placeholder");
                    return input.val(input.attr("placeholder"));
                }
            }).blur();
            $("[placeholder]").parents("form").submit(function() {
                return $(this).find("[placeholder]").each(function() {
                    var input;

                    input = $(this);
                    if (input.val() === input.attr("placeholder")) {
                        return input.val("");
                    }
                });
            });
        }
        if (!$("body").hasClass("fixed-header")) {
            return $('#main-nav.main-nav-fixed').affix({
                offset: 40
            });
        }
    });

    this.setSelect2 = function(selector) {
        if (selector == null) {
            selector = $(".select2");
        }
        return selector.each(function(i, elem) {
            return $(elem).select2();
        });
    };

    this.setValidateForm = function(selector) {
        if (selector == null) {
            selector = $(".validate-form");
        }
        return selector.each(function(i, elem) {
            return $(elem).validate({
                errorElement: "span",
                errorClass: "help-block error",
                errorPlacement: function(e, t) {
                    return t.parents(".controls").append(e);
                },
                highlight: function(e) {
                    return $(e).closest(".control-group").removeClass("error success").addClass("error");
                },
                success: function(e) {
                    return e.closest(".control-group").removeClass("error");
                }
            });
        });
    };

    this.setDataTable = function(selector) {
        return selector.dataTable({
            sDom: "<'row-fluid'<'span6'l><'span6 text-right'f>r>t<'row-fluid'<'span6'i><'span6 text-right'p>>",
            sPaginationType: "bootstrap",
            bRetrieve:true,
            bDestroy: true

        });
    };

    
    this.setDataTable_ajax = function(selector, new_filter_url,aoColumns,  aoColumnDefs,trueorfalse) {
        
        if(trueorfalse==undefined){
            trueorfalse=true;
        };
        var count_count = 10;
        if (new_filter_url.substr(0,16)=="zheshiyigeshibie") {
            count_count = 1000;
        }
        //var lang = navigator.language||navigator.userLanguage;
        //lang = lang.substr(0, 2);
        var lang = getCookie("Language");
        if("zh"==lang){
            return selector.dataTable({
                sDom: "<'row-fluid'<'span6'l><'span6 text-right'f>r>t<'row-fluid'<'span6'i><'span6 text-right'p>>",
                iDisplayLength: count_count,
                sPaginationType: "bootstrap",
                sAjaxSource: new_filter_url,
                bFilter: trueorfalse,
                oLanguage: {
                            "sLengthMenu": "_MENU_ 条/页",
                            "sSearch": "搜索:",
                            "sZeroRecords": "没有检索到数据",
                            "sInfo": "显示 _START_ 至 _END_ 条 &nbsp;&nbsp;共 _TOTAL_ 条",
                            "sInfoFiltered": "(筛选自 _MAX_ 条数据)",
                            "sInfoEmpty": "当前显示0到0条，共0条记录",
                            "sEmptyTable": "没有获取到数据",
                            "sProcessing": "正在加载数据...",
                            "oPaginate": {
                                "sFirst": "首页",
                                "sPrevious": "前一页",
                                "sNext": "后一页",
                                "sLast": "末页"
                            }
                },
                //bLengthChange: true,
                bInfo: true,
                bSortL:true,
                bRetrieve:true,
                bDestroy: true,
                bAutoWidth: true,
                bStateSave: false,
                bProcessing: true, //开启读取服务器数据时显示正在加载中……特别是大数据量的时候，开启此功能比较好
                bServerSide: true, //开启服务器模式，使用服务器端处理配置datatable。注意：sAjaxSource参数也必须被给予为了给datatable源代码来获取所需的数据对于每个画。 这个翻译有点别扭。开启此模式后，你对datatables的每个操作 每页显示多少条记录、下一页、上一页、排序（表头）、搜索，这些都会传给服务器相应的值。
                aoColumns: aoColumns,
                aoColumnDefs: aoColumnDefs,

                fnServerData: function(sSource, aoData, fnCallback) {
                    if (sSource.substr(0,16)=="zheshiyigeshibie") {
                        sSource=sSource.slice(16);
                        aoData[4]["value"] = 10000;
                    }
                    $.ajax({
                        url: sSource, //这个就是请求地址对应sAjaxSource
                        data: {
                            "aoData": JSON.stringify(aoData)
                        },
                        type: 'POST',
                        dataType: 'json',
                        async: false,
                        success: function(result) {
                            //alert("ss");
                            //var obj=JSON.parse(result);
                            //alert(JSON.stringify(result));
                            fnCallback(result); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
                        }
                    });

                }


            });
        }else{
            return selector.dataTable({
                sDom: "<'row-fluid'<'span6'l><'span6 text-right'f>r>t<'row-fluid'<'span6'i><'span6 text-right'p>>",
                iDisplayLength: count_count,
                sPaginationType: "bootstrap",
                sAjaxSource: new_filter_url,
                bFilter: trueorfalse,
                oLanguage: {
                            "sLengthMenu": "_MENU_ Artículo / página",
                            "sSearch": "Búsqueda:",
                            "sZeroRecords": "No encontrado con datos",
                            "sInfo": "Exhibir _START_ A _END_ Registro &nbsp;&nbsp;Total _TOTAL_ Registro",
                            "sInfoFiltered": "(Filtrar desde _MAX_ Datos)",
                            "sInfoEmpty": "Actualmente mostrando 0 a 0, un total de 0 registros",
                            "sEmptyTable": "No han obtenido datos ",
                            "sProcessing": "Cargando datos...",
                            "oPaginate": {
                                "sFirst": "Inicio",
                                "sPrevious": "Pagina anterior",
                                "sNext": "Siguiente pagina",
                                "sLast": "Ultima pagina"
                            }
                    },
                //bLengthChange: true,
                bInfo: true,
                bSortL:true,
                bRetrieve:true,
                bDestroy: true,
                bAutoWidth: true,
                bStateSave: false,
                bProcessing: true, //开启读取服务器数据时显示正在加载中……特别是大数据量的时候，开启此功能比较好
                bServerSide: true, //开启服务器模式，使用服务器端处理配置datatable。注意：sAjaxSource参数也必须被给予为了给datatable源代码来获取所需的数据对于每个画。 这个翻译有点别扭。开启此模式后，你对datatables的每个操作 每页显示多少条记录、下一页、上一页、排序（表头）、搜索，这些都会传给服务器相应的值。
                aoColumns: aoColumns,
                aoColumnDefs: aoColumnDefs,

                fnServerData: function(sSource, aoData, fnCallback) {
                    if (sSource.substr(0,16)=="zheshiyigeshibie") {
                        sSource=sSource.slice(16);
                        aoData[4]["value"] = 10000;
                    }
                    $.ajax({
                        url: sSource, //这个就是请求地址对应sAjaxSource
                        data: {
                            "aoData": JSON.stringify(aoData)
                        },
                        type: 'POST',
                        dataType: 'json',
                        async: false,
                        success: function(result) {
                            //alert("ss");
                            //var obj=JSON.parse(result);
                            //alert(JSON.stringify(result));
                            fnCallback(result); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
                        }
                    });

                }


            });
        }


        



    };

    this.setDataTable_ajax_5 = function(selector, new_filter_url,aoColumns,  aoColumnDefs,trueorfalse) {
        
        if(trueorfalse==undefined){
            trueorfalse=true;
        };
        var count_count = 5;
        if (new_filter_url.substr(0,16)=="zheshiyigeshibie") {
            count_count = 1000;
        }
        return selector.dataTable({
            sDom: "<'row-fluid'<'span6'l><'span6 text-right'f>r>t<'row-fluid'<'span6'i><'span6 text-right'p>>",
            iDisplayLength: count_count, 
            sPaginationType: "bootstrap",
            sAjaxSource: new_filter_url,
            bFilter: trueorfalse,
            oLanguage: {
                sLengthMenu: "_MENU_ 条/页",
                sSearch: "ss搜索:",
                "sZeroRecords": "没有检索到数据",
                "sInfo": "显示 _START_ 至 _END_ 条 &nbsp;&nbsp;共 _TOTAL_ 条",
                "sInfoFiltered": "(筛选自 _MAX_ 条数据)",
                "sInfoEmpty": "当前显示0到0条，共0条记录",
                "sEmptyTable": "没有获取到数据",
                "sProcessing": "正在加载数据...",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "末页"
                } 
                

            },
            //bLengthChange: true,
            bInfo: true,
            bSortL:true,
            bRetrieve:true,
            bDestroy: true,
            bAutoWidth: true,
            bStateSave: false,
            bProcessing: true, //开启读取服务器数据时显示正在加载中……特别是大数据量的时候，开启此功能比较好
            bServerSide: true, //开启服务器模式，使用服务器端处理配置datatable。注意：sAjaxSource参数也必须被给予为了给datatable源代码来获取所需的数据对于每个画。 这个翻译有点别扭。开启此模式后，你对datatables的每个操作 每页显示多少条记录、下一页、上一页、排序（表头）、搜索，这些都会传给服务器相应的值。 
            aoColumns: aoColumns,
            aoColumnDefs: aoColumnDefs,

            fnServerData: function(sSource, aoData, fnCallback) {
                if (sSource.substr(0,16)=="zheshiyigeshibie") {
                    sSource=sSource.slice(16);
                    aoData[4]["value"] = 10000;
                }
                $.ajax({
                    url: sSource, //这个就是请求地址对应sAjaxSource
                    data: {
                        "aoData": JSON.stringify(aoData)
                    },
                    type: 'POST',
                    dataType: 'json',
                    async: false,
                    success: function(result) {
                        //alert("ss");
                        //var obj=JSON.parse(result);
                        //alert(JSON.stringify(result));
                        fnCallback(result); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {

                        // alert("status:" + XMLHttpRequest.status + ",readyState:" + XMLHttpRequest.readyState + ",textStatus:" + textStatus);

                    }
                });

            }


        });

        



    };




    this.setMaxLength = function(selector) {
        if (selector == null) {
            selector = $(".char-max-length");
        }
        return selector.maxlength();
    };

    this.getCookie = function(cookie_name) {
        var allcookies = document.cookie;
        //索引长度，开始索引的位置
        var cookie_pos = allcookies.indexOf(cookie_name);

        // 如果找到了索引，就代表cookie存在,否则不存在
        if (cookie_pos != -1) {
            // 把cookie_pos放在值的开始，只要给值加1即可
            //计算取cookie值得开始索引，加的1为“=”
            cookie_pos = cookie_pos + cookie_name.length + 1;
            //计算取cookie值得结束索引
            var cookie_end = allcookies.indexOf(";", cookie_pos);

            if (cookie_end == -1) {
                cookie_end = allcookies.length;

            }
            //得到想要的cookie的值
            var value = unescape(allcookies.substring(cookie_pos, cookie_end));
        }
        if(value != null && value != ""){
            value = value.substr(0,2);
        }else{
            value = "zh";
        }
        return value;
    }

    this.setCharCounter = function(selector) {
        if (selector == null) {
            selector = $(".char-counter");
        }
        return selector.charCount({
            allowed: selector.data("char-allowed"),
            warning: selector.data("char-warning"),
            cssWarning: "text-warning",
            cssExceeded: "text-error"
        });
    };

    this.setAutoSize = function(selector) {
        if (selector == null) {
            selector = $(".autosize");
        }
        return selector.autosize();
    };

    this.setTimeAgo = function(selector) {
        if (selector == null) {
            selector = $(".timeago");
        }
        jQuery.timeago.settings.allowFuture = true;
        jQuery.timeago.settings.refreshMillis = 60000;
        selector.timeago();
        return selector.addClass("in");
    };

    this.setScrollable = function(selector) {
        if (selector == null) {
            selector = $(".scrollable");
        }
        return selector.each(function(i, elem) {
            return $(elem).slimScroll({
                height: $(elem).data("scrollable-height"),
                start: $(elem).data("scrollable-start") || "top"
            });
        });
    };

    this.setSortable = function(selector) {
        if (selector == null) {
            selector = null;
        }
        if (selector) {
            return selector.sortable({
                axis: selector.data("sortable-axis"),
                connectWith: selector.data("sortable-connect")
            });
        }
    };

}).call(this);
