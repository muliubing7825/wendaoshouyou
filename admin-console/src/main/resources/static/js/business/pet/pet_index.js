//未发布


function getParams($) {
    var data = {
        name: $('#name').val(),
    };
    return data;
}


function callback() {
    var $ = layui.$;
    var table = layui.table;


    table.render({
        elem: '#my_table'
        , height: 312
        , limit: 20
        , height: 'full-150'
        , url: _contextPath + 'business/pet/pet_data'
        , page: true //开启分页
        , cols: [[
            {
                field: "id",
                title: "id",
                hide: true
            }, {
                width: 70,
                field: "index",
                title: "图鉴",
            }, {
                width: 70,
                field: "polar",
                title: "相行",
            }, {
                width: 150,
                field: "name",
                title: "名称",
            }, {
                width: 100,
                field: "icon",
                title: "图标",
            }, {
                width: 100,
                field: "levelReq",
                title: "携带等级",
            }, {
                width: 100,
                field: "life",
                title: "血气成长",
            }, {
                width: 100,
                field: "mana",
                title: "法力成长",
            }, {
                width: 100,
                field: "speed",
                title: "速度成长",
            }, {
                width: 100,
                field: "phyAttack",
                title: "物攻成长",
            }, {
                width: 100,
                field: "magAttack",
                title: "法功成长",
            }, {
                width: 200,
                field: "skiils",
                title: "天生技能",
            }, {
                width: 150,
                field: "zoon",
                title: "所在地图",
            }, {
                width: 180,
                field: "addTime",
                title: "添加时间",
            }, {
                width: 180,
                field: "updateTime",
                title: "修改时间",
            }, {
                title: '操作',
                width: 150,
                fixed: "right",
                templet: function (data) {
                    var str = ''
                    str += '<button class="layui-btn layui-btn-xs  layui-btn-normal" lay-event="update"><i class="layui-icon layui-icon-edit"></i>修改</button>'
                    str += '<button class="layui-btn layui-btn-xs  layui-btn-danger" lay-event="delete"><i class="layui-icon layui-icon-delete"></i>删除</button>'
                    return str;
                }
            }
        ]]
        , request: {
            limitName: 'pageSize'
        }
        , where: getParams($)
        , text: {
            none: '暂无数据!'
        }
    }), table.on("tool(my_table)", function (e) {
        var data = e.data;
        if ("delete" == e.event) {
            layer.confirm('真的删除吗？', {
                title: '删除',
                yes: function (index) {
                    layui.$.ajax({
                        "url": _contextPath + "business/pet/pet_delete?id=" + data.id,
                        "method": "GET"
                        , error: function (res) {
                            top.layer.msg('网络异常', {icon: 5});
                        }
                    }).done(function (res) {
                        if (res.code == 200) {
                            top.layer.msg('删除成功', {icon: 6});
                            reloadTable();
                            layer.close(index);
                        } else {
                            top.layer.msg(res.msg, {icon: 5});
                        }
                    });

                }
            });
        } else if ("update" == e.event) {
            layer.open({
                type: 2,
                title: '宠物修改',
                btn: ["保存", "取消"],
                area: ['500px', '400px'],
                content: _contextPath + 'business/pet/pet_add?id=' + e.data.id,
                yes: function (index, _dom) {
                    save(index, _dom);
                }
            });
        }

    });


    function reloadTable() {
        table.reload('my_table', {
            where: getParams($),
            page: {
                curr: 1
            }
        });
    }

    $('#search').click(function () {
        reloadTable();
    });

    $('#add').click(function () {
        layer.open({
            type: 2,
            title: '宠物添加',
            btn: ["保存", "取消"],
            area: ['500px', '400px'],
            content: _contextPath + 'business/pet/pet_add',
            yes: function (index, _dom) {
                save(index, _dom);
            }
        });
    });

    function save(index, _dom) {
        var iframeWindow = window['layui-layer-iframe' + index];
        var _submit = _dom.find('iframe').contents().find("#submit");
        //点击提交
        iframeWindow.layui.form.on('submit(submit)', function (data) {
            $.ajax({
                "url": _contextPath + "business/pet/pet_save",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                },
                "data": JSON.stringify(data.field)
                , error: function (res) {
                    top.layer.msg('网络异常', {icon: 5});
                }
            }).done(function (res) {
                if (res.code == 200) {
                    top.layer.msg('保存成功', {icon: 6});
                    reloadTable();
                    layer.closeAll();
                } else {
                    top.layer.msg(res.msg, {icon: 5});
                }
            });
        });
        _submit.trigger('click');
    }

}
