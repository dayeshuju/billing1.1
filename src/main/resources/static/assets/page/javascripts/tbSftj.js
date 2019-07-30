/*引用theme.js*/
$(document).ready(function () {
    findSftj();
});

function findSftj() {
    /*定义列id和名称*/
    var aoColumns = [{
        mDataProp: "id",
        sTile: "序号",
        sWidth: "50px"
    }, {
        mDataProp: "name",
        sTitle: "姓名"
    }, {
        mDataProp: "payTime",
        sTitle: "收费日期"
    }, {
        mDataProp: "actualAmount",
        sTitle: "应收金额"
    }
    ];

    /*给操作列设置填充 */
    var aoColumnDefs = [{
        "bSortable": false,
        "aTargets": [0, 1, 2, 3]
    }, {
        "sDefaultContent": '',
        "aTargets": ['_all']
    }
    ];

    var new_filter_url = "tbJfjl/getSftjList"; //表#plist数据获取url

    var oTable = setDataTable_ajax($("#plist"), new_filter_url, aoColumns, aoColumnDefs, true);

    oTable.columnFilter();
    var oSettings = oTable.fnSettings();
    oSettings.sAjaxSource = new_filter_url;
    oTable.fnDraw();
}
