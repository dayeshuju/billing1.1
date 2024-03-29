/*引用theme.js*/
$(document).ready(function () {
    //var lang = navigator.language||navigator.userLanguage;
    //lang = lang.substr(0, 2);
    var lang = getCookie("Language");
    if("zh"==lang){
        findjlsb();
    }else{
        findjlsbEs();
    }
});

function findjlsb() {
    /*定义列id和名称*/
    var aoColumns = [{
        mDataProp: "id",
        sTitle: "ID"
    }, {
        mDataProp: "meterId",
        sTitle: "表号"
    }, {
        mDataProp: "meterBoxId",
        sTitle: "表箱号"
    }, {
        mDataProp: "name",
        sTitle: "用户姓名"
    }, {
        mDataProp: "idCode",
        sTitle: "用户身份证号"
    }, {
        mDataProp: "id",
        sTitle: "操作"
    }

    ];

    /*给操作列设置填充 */
    var aoColumnDefs = [{
        "bSortable": false,
        "aTargets": [0, 1, 2, 3, 4, 5]
    }, {
        "sDefaultContent": '',
        "aTargets": ['_all']
    }, {
        "aTargets": [5],
        "mRender": function (data, type, row) {
            return " <div class='text-left'><a class='btn btn-success btn-mini' data-toggle='modal' href='#modal-addjlsb' role='button' style='background-color:#00BB00' onclick=modifyjlsb(" + data + ")><i class='icon-pencil'></i>修改</a></div>";
        }
    }, {
        "aTargets": [0],
        "mRender": function (data, type, full) {

            return "<span class='label label-number'>" + data + "</span>";
        }
    }


    ];

    var new_filter_url = "tbJlsb/getJlsbList"; //表#plist数据获取url

    var oTable = setDataTable_ajax($("#plist"), new_filter_url, aoColumns, aoColumnDefs, true);

    oTable.columnFilter();
    var oSettings = oTable.fnSettings();
    oSettings.sAjaxSource = new_filter_url;
    oTable.fnDraw();
}
//西班牙语
function findjlsbEs() {
    /*定义列id和名称*/
    var aoColumns = [{
        mDataProp: "id",
        sTitle: "ID"
    }, {
        mDataProp: "meterId",
        sTitle: "Contador No"
    }, {
        mDataProp: "meterBoxId",
        sTitle: "Contador caja No"
    }, {
        mDataProp: "name",
        sTitle: "Nombre y apellido"
    }, {
        mDataProp: "idCode",
        sTitle: "Identificación del usuario"
    }, {
        mDataProp: "id",
        sTitle: "Operar"
    }

    ];

    /*给操作列设置填充 */
    var aoColumnDefs = [{
        "bSortable": false,
        "aTargets": [0, 1, 2, 3, 4, 5]
    }, {
        "sDefaultContent": '',
        "aTargets": ['_all']
    }, {
        "aTargets": [5],
        "mRender": function (data, type, row) {
            return " <div class='text-left'><a class='btn btn-success btn-mini' data-toggle='modal' href='#modal-addjlsb' role='button' style='background-color:#00BB00' onclick=modifyjlsb(" + data + ")><i class='icon-pencil'></i>Modificar</a></div>";
        }
    }, {
        "aTargets": [0],
        "mRender": function (data, type, full) {

            return "<span class='label label-number'>" + data + "</span>";
        }
    }


    ];

    var new_filter_url = "tbJlsb/getJlsbList"; //表#plist数据获取url

    var oTable = setDataTable_ajax($("#plist"), new_filter_url, aoColumns, aoColumnDefs, true);

    oTable.columnFilter();
    var oSettings = oTable.fnSettings();
    oSettings.sAjaxSource = new_filter_url;
    oTable.fnDraw();
}
//var oSettings = oTable.fnSettings();
//oSettings.sAjaxSource = new_filter_url;
//oTable.fnDraw();


/*行点击*/
$('#plist tbody tr').live('click', function () {

    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        oTable.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }

    var sTitle;
    var nTds = $('td', this);
    var sday = $(nTds[0]).text(); //得到第1列的值------uid

    $("#jlsbId").val(sday);

});



/*删除确认按钮onclick*/
/*$('#deleterow').click(function () {

    var jlsbId = $("#jlsbId").val();
    var params = {
        id: jlsbId
    }
    var url = "tbJlsb/deleteJlsb";

    $.post(url, params, function (result) {
        $('#modal-deletejlsb').modal('hide');
        if (result.state == 1) {

            start = oTable.fnSettings()._iDisplayStart;
            total = oTable.fnSettings().fnRecordsDisplay();

            if ((total - start) == 1) {
                if (start > 0) {
                    oTable.fnPageChange('previous', true);
                }
            }

            oTable.fnDraw();
            layer.msg(result.message, {
                icon: 1
            });
        } else if (result.state == 0) {
            layer.msg(result.message, {
                icon: 2
            });
        }
    })
});*/


/*添加、修改保存按钮onclick*/
function addjlsb() {
    var id = $("#jlsbId").val();
    var meterId = $("#meterId").val();
    var meterBoxId = $("#meterBoxId").val();
    var ydyhId = $("#ydyhId").val();
    var idCode = $("#idCode").val();

    var params = {
        id: id,
        meterId: meterId,
        meterBoxId: meterBoxId,
        ydyhId: ydyhId,
        idCode: idCode,
    }

    var url = "";
    if (Number(id) > 0) {
        url = "tbJlsb/updateJlsb";
    } else {
        url = "tbJlsb/addJlsb";
    }

    $.post(url, params, function (result) {
        if (result.state == 1) {
            $('#modal-addjlsb').modal('hide');
            initform();
            var lang = getCookie("Language");
            if("zh"==lang){
                findjlsb();
            }else{
                findjlsbEs();
            }
            layer.msg(result.message, {
                icon: 1
            });
        }
        ;
        if (result.state == 0) {
            layer.msg(result.message, {
                icon: 2
            });
        }
    })

}

function initform() {
    $("#jlsbId").val("0");
    $("#meterId").val("");
    $("#meterBoxId").val("");
    $("#idCode").val("");
    $("#ydyhId").val(0);
}

/*修改用户弹出层*/
function modifyjlsb(id) {
    initform();
    $("#jlsbId").val(id);
    var url = "tbJlsb/getJlsb";
    var params = {
        id: id
    };
    $.post(url, params, function (result) {
        if (result.state == 1) {
            $("#meterId").val(result.data.meterId);
            $("#meterBoxId").val(result.data.meterBoxId);
            $("#idCode").val(result.data.idCode);
            $("#ydyhId").val(result.data.ydyhId);
        }
    })
}

//查询用电用户
function finduser() {
    /*定义列id和名称*/
    var aoColumns = [{
        mDataProp: "id",
        sTitle: "ID"
    }, {
        mDataProp: "name",
        sTitle: "姓名"
    }, {
        mDataProp: "idCode",
        sTitle: "身份证号"
    }, {
        mDataProp: "address",
        sTitle: "用户地址"
    }, {
        mDataProp: "phoneNum",
        sTitle: "联系方式"
    }, {
        mDataProp: "note",
        sTitle: "用户类型"
    }, {
        mDataProp: "id",
        sTitle: "操作"
    }

    ];

    /*给操作列设置填充 */
    var aoColumnDefs = [{
        "bSortable": false,
        "aTargets": [0, 1, 2, 3, 4, 5, 6]
    }, {
        "sDefaultContent": '',
        "aTargets": ['_all']
    }, {
        "aTargets": [6],
        "mRender": function (data, type, row) {
            return " <div class='text-left'><a class='btn btn-success btn-mini' data-toggle='modal' role='button' style='background-color:#00BB00' onclick=selectYDuser(\""+ row.idCode +"\")><i class='icon-pencil'></i> 选择</a></div>";
        }
    }, {
        "aTargets": [0],
        "mRender": function (data, type, full) {
            return "<span class='label label-number'>" + data + "</span>";
        }
    }


    ];

    var new_filter_url = "tbYdyh/getYdyhList"; //表#plist数据获取url

    var oTable = setDataTable_ajax($("#userList"), new_filter_url, aoColumns, aoColumnDefs, true);

    oTable.columnFilter();
    var oSettings = oTable.fnSettings();
    oSettings.sAjaxSource = new_filter_url;
    oTable.fnDraw();
}

//西班牙语
function finduserEs() {
    /*定义列id和名称*/
    var aoColumns = [{
        mDataProp: "id",
        sTitle: "ID"
    }, {
        mDataProp: "name",
        sTitle: "Nombre y apellido"
    }, {
        mDataProp: "idCode",
        sTitle: "DNI No"
    }, {
        mDataProp: "address",
        sTitle: "Direccion de usuario"
    }, {
        mDataProp: "phoneNum",
        sTitle: "Contacto"
    }, {
        mDataProp: "note",
        sTitle: "Tipo de usuario"
    }, {
        mDataProp: "id",
        sTitle: "Operar"
    }

    ];

    /*给操作列设置填充 */
    var aoColumnDefs = [{
        "bSortable": false,
        "aTargets": [0, 1, 2, 3, 4, 5, 6]
    }, {
        "sDefaultContent": '',
        "aTargets": ['_all']
    }, {
        "aTargets": [6],
        "mRender": function (data, type, row) {
            return " <div class='text-left'><a class='btn btn-success btn-mini' data-toggle='modal' role='button' style='background-color:#00BB00' onclick=selectYDuser(\""+ row.idCode +"\")><i class='icon-pencil'></i> Elección</a></div>";
        }
    }, {
        "aTargets": [0],
        "mRender": function (data, type, full) {
            return "<span class='label label-number'>" + data + "</span>";
        }
    }


    ];

    var new_filter_url = "tbYdyh/getYdyhList"; //表#plist数据获取url

    var oTable = setDataTable_ajax($("#userList"), new_filter_url, aoColumns, aoColumnDefs, true);

    oTable.columnFilter();
    var oSettings = oTable.fnSettings();
    oSettings.sAjaxSource = new_filter_url;
    oTable.fnDraw();
}

function selectUser(){
    //var lan = navigator.language||navigator.userLanguage;
    //lan = lan.substr(0, 2);
    var lan = getCookie("Language");
    if("zh"==lan){
        finduser();
    }else{
        finduserEs();
    }
    $("#modal-selectUser").modal("show");
}

function selectYDuser(idCode){
    $("#idCode").val(idCode);
    $("#modal-selectUser").modal("hide");
}
