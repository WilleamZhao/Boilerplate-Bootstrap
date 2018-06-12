/**
 * Created by sourcod on 2017/11/22.
 * JS工具类
 */

var LocString = String(window.document.location.href);  // URL地址


/**
 * ajax post提交
 * @param url
 * @param param
 * @param datat 为html,json,text
 * @param callback回调函数
 * @return
 */
function jsonAjax(url, param, datat, callback) {
    $.ajax({
        type: "post",
        url: url,
        data: param,
        dataType: datat,
        success: callback,
        error: function () {

        }
    });
}


/**
 * ajax get提交
 * @param url
 * @param param
 * @param datat 为html,json,text
 * @param callback回调函数
 * @return
 */
function getAjax(url, param, datat, callback) {
    $.ajax({
        type: "get",
        url: url,
        data: param,
        dataType: datat,
        success: callback,
        error: function () {

        }
    });
}

/**
 * ajax get提交
 * @param url
 * @param param
 * @param datat 为html,json,text
 * @param callback回调函数
 * @return
 */
function getAjax(url, param, datat, callback, i) {
    $.ajax({
        type: "get",
        url: url,
        data: param,
        dataType: datat,
        success: function (obj) {
            callback(obj, i);
        },
        error: function () {

        }
    });
}



function HrPost(url, data, isHideLoading, callBack, dataType) {
    var dataType;
    //如果没有显示loading动画，则此时isHideLoading会被赋值成一个函数，而如果第四个参数也没有传，第四个参数就是undefined
    if (!$.isFunction(callBack)) {
        if (callBack == undefined) {
            dataType = "json";
        } else {
            dataType = callBack;
        }
    } else {
        dataType = dataType || "json";
    }

    if (isHideLoading) {
        if ($.isFunction(isHideLoading)) {
            callBack = isHideLoading;
            isHideLoading = false;
        }
    }

    //可以根据自己的实际需求来定制是否显示loading动画
    if (isHideLoading) {
        var loading = '<div class="ajaxLoading"><div class="loader">加载中...</div></div>';
        $("body").append(loading);
        $(".ajaxLoading").show();
        isHideLoading = false;
    }

    $.post(url, data, function (res) {
        if (!isHideLoading) {
            $(".ajaxLoading").hide();
        }

        if (res != null && res != "") {
            if (callBack) {
                if ($.isFunction(callBack)) {
                    callBack(res);
                } else {
                    console.log("callBack is not a function");
                }
            }
        }
    }, dataType);
}


/**
 * 获取URL参数
 * str 参数名称
 */
function getQueryStr(str) {
    var LocString = String(window.document.location.href);
    var rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(LocString), tmp;
    // console.log(rs);
    if (tmp = rs) {
        return tmp[2];
    }
    // parameter cannot be found
    return "";
}


//开始上传
function uploadImg(){
    var imgFile=document.querySelector("#file");
    //获取图片文件
    var file = imgFile.files[0];//文件对象
    var name = file.name;//图片名
    //var size = file.size;//图片大小
    //var type = file.type;//文件类型
    syncUpload("", file);
    //检测浏览器对FileReader的支持
    if(window.FileReader) {
        var reader = new FileReader();
        reader.onload = function(){//异步方法,文件读取成功完成时触发
            var dataImg = reader.result;//文件一旦开始读取，无论成功或失败，实例的 result 属性都会被填充。如果读取失败，则 result 的值为 null ，否则即是读取的结果
            syncUpload(name,dataImg);
        };
        reader.readAsDataURL(file);//将文件读取为 DataURL
    }else {
        layer.msg("浏览器不支持H5的FileReader!");
    }
}

function syncUpload(name,dataImg){
    var imgFile = dataImg;//dataImg.replace(/\+/g,"#wb#");//将所有“+”号替换为“#wb#”
    // imgFile = imgFile.substring(imgFile.indexOf(",")+1);//截取只保留图片的base64部分,去掉了data:image/jpeg;base64,这段内容
    imgFile = encodeURIComponent(imgFile);//把字符串作为 URI 组件进行编码。后台容器会自动解码一次
    name = encodeURIComponent(encodeURIComponent(name));//这里对中文参数进行了两次URI编码，后台容器自动解码了一次，获取到参数后还需要解码一次才能得到正确的参数内容
    var mydata = "qqfile="+dataImg;

    var ajax=new XMLHttpRequest();
    //发送POST请求
    ajax.open("POST", teydUrl + "activity/uploadpic",true);
    ajax.send(mydata);
    ajax.onreadystatechange=function(){
        if (ajax.readyState == 4) {
            if (ajax.status>=200 &&ajax.status<300||ajax.status==304) {
                console.log(ajax.responseText);
                var obj=JSON.parse(ajax.responseText);
                alert(obj.msg);
                if(obj.err == 0){
                    //上传成功后自动动创建img标签放在指定位置
                    var img =$("<img src='"+obj.msg+"' alt='' />");
                    $(".con").append(img);
                    imgs.push(obj.msg);
                }else{
                    alert(obj.msg);
                }
            }
        }
    }

    /*$.ajax({
     url: teydUrl + "activity/uploadpic",
     data: mydata,
     type: "post",
     dataType: "json",
     success: function(data){
     if(data.state == 'ok'){
     document.getElementById("upload").value = "";//重置文件域
     layer.msg(data.msg);
     }else if(data.state == 'error'){
     layer.msg(data.msg);
     }
     }
     });*/
}

/**
 * 验证移动电话号码
 * @param phoneNumber 电话号码
 * @returns {boolean}
 */
function checkMobile(phoneNumber) {
    var value = phoneNumber;
    //var regTel = /^0(13[0-9]|15[0-9]|18[0-9]|14[0-9])[0-9]{8}$/.test(value);
    var regTel = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value);
    if (value != "") {
        if (!regTel) {
            return false;
        }
    } else {
        return false;
    }
    return true;
}

/**
 * 验证固定电话号码
 * @param phoneNumber 电话号码
 * @returns {boolean}
 */
function checkTel(phoneNumber) {
    var value = phoneNumber;
    var regTel1 = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value);//带区号的固定电话
    var regTel2 = /^(\d{7,8})(-(\d{3,}))?$/.test(value);//不带区号的固定电话
    if (value != "") {
        console.log(value);
        if (!regTel1 && !regTel2) {
            // alert("电话号码输入有误！");
            return false;
        }
    } else {
        // alert("请输入电话号码！");
        return false;
    }
    // alert("电话号码输入正确！");
    return true;
}

/**
 * 验证邮政编码
 * @param postcode 邮编
 * @returns {boolean}
 */
function checkPostcode(postcode) {
    if ( postcode == "") {
        return false;
    } else {
        if (! /^[0-9][0-9]{5}$/.test(postcode)) {
            return false;
        }
    }
    return true;
}

/**
 * 转换/r/n 为br
 * @param s
 * @returns {*}
 */
function converBr(s) {
    var title = s.replace(/\r\n/g,"<br>");
    title = title.replace(/\n/g,"<br>");
    return title;
}


/**
 * 去掉空格
 * @param s
 * @returns {*}
 */
function trimAll(s) {
    return s.replace(/\s+/g,"");
}
