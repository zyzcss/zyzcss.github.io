$(function () {
    //cookie判断
    if ($.cookie('user')) {
        console.log('账户存在')
        $('#header-user').show();
        $('#header-reg').hide();
        $('#header-user #username').text($.cookie('user'));
    } else {
        console.log('账户不存在')
        $('#header-user').hide();
        $('#header-reg').show();
    }
    //个人信息移入移除
    $('#header-user').on('mouseover',function () {
        $(this).find('.header-user-info').show();
    }).on('mouseout',function () {
        $(this).find('.header-user-info').hide();
    });
    //注销按钮
    $('.user-exit').on('click',function () {
        $.cookie('user',"user",{ expires: -1 });
        location.reload();
    })
    //表单的验证和提交
    $("#regForm").bootstrapValidator({
        live: 'enabled',//验证时机，enabled是内容有变化就验证（默认），disabled和submitted是提交再验证
        submitButtons: '#regSubmit',//指定提交按钮，如果验证失败则变成disabled，但我没试成功，反而加了这句话非submit按钮也会提交到action指定页面
        message: '通用的验证失败消息',//好像从来没出现过
        feedbackIcons: {//根据验证结果显示的各种图标
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            regName: {
                validators: {
                    notEmpty: {
                        message: '文本框必须输入'
                    },
                    regexp: {//正则验证
                        regexp:  /^[a-z0-9_-]{3,16}$/,
                        message: '用户名必须由3到16位的字母数字下划线组成'
                    }
                }
            },
            regPassword: {
                validators: {
                    notEmpty: {
                        message: '文本框必须输入'
                    },
                    regexp: {
                        regexp:  /^[a-z0-9_-]{6,18}$/ ,
                        message: '密码必须由6到18位的字母数字下划线组成'
                    }
                }
            },
            regEmail:{
                validators: {
                    notEmpty: {
                        message: '文本框必须输入'
                    },
                    regexp: {
                        regexp:  /^[A-Za-z0-9\\u4e00-\\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$/ ,
                        message: '请输入正确的邮箱格式'
                    }
                }
            }
        }
    });
    $("#loginForm").bootstrapValidator({
        live: 'enabled',//验证时机，enabled是内容有变化就验证（默认），disabled和submitted是提交再验证
        submitButtons: '#loginSubmit',//指定提交按钮，如果验证失败则变成disabled，但我没试成功，反而加了这句话非submit按钮也会提交到action指定页面
        message: '通用的验证失败消息',//好像从来没出现过
        feedbackIcons: {//根据验证结果显示的各种图标
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    regexp: {//正则验证
                        regexp: /^[a-z0-9_-]{3,16}$/,
                        message: '所输入的字符不符要求'
                    }
                },
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    regexp: {
                        regexp:  /^[a-z0-9_-]{6,18}$/ ,
                        message: '密码必须由6到18位的字母数字下划线组成'
                    }
                }
            },
        }
    })
    $('#loginSubmit').click(function () {
        $("#loginForm").bootstrapValidator('validate');
        if ($("#loginForm").data('bootstrapValidator').isValid()) {
            $(this).button('loading');
            var logName=$('#loginName').val();
            console.log(logName)
            var sub=function () {
                $.ajax({
                    type:'POST',
                    url:'login.action',
                    dataType:'json',
                    data:formToJson($('#loginForm')),
                    success:function(responseTest, statusTest){
                        if(responseTest.msg==500){
                            $('#logError').show();
                            $('#loginSubmit').button('reset');
                        }else if(responseTest.msg==200){
                            console.log('登录成功');
                            if($('#remeberme').prop('checked')){
                                $.cookie('user',logName,{ expires: 7 });
                            }else{
                                $.cookie('user',logName,{ expires: 1 });
                            }
                            location.reload();
                        }
                    },
                    error:function(xhr,errorText,errprType){
                        console.log("error",xhr);
                    }
                });
            };
            setTimeout(sub,1500);
        }
    })
    function formToJson(form) {
        var formObject = {};
        var formArray =form.serializeArray();
        $.each(formArray,function(i,item){
            formObject[item.name] = item.value;
        });
        return formObject;
    }
});