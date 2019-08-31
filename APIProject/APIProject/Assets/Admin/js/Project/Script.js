


// TÌM KIẾM THÔNG TIN NGƯỜI DÙNG 
function SeachUser() {
    $.ajax({
        url: "/User/Seach",
        data: {
            Page: 1,
            Role: $("#txtSeachUserByRole").val(),
            UserName: $("#txtSeachUserByUserName").val(),
        },
        success: function (result) {
            $("#Table_User").html(result);
        }
    });
}



// THÊM MỚI THÔNG TIN NGƯỜI DÙNG 
function AddUser() {
    var pass1 = $("#txtAddPass1").val();
    var pass2 = $("#txtAddPass2").val();
    if (pass1 != pass2) {
        swal("Notification", "(" + window._password_does_not_match + ")", "error");
    }
    else {
        $.ajax({
            url: "/User/AddUser",
            data: $("#FormAdd_User").serialize(),
            success: function (result) {
                if (result == 1) {
                    $("#Modal_AdđUser").hide();
                    swal("Notification!", "" + window._added_new_advertisement_succesfully + "", "success");
                }
                else if (result == -1) {
                    swal("Notification", "(" + window._account_already_exists + ")", "error");
                }
                else {
                    swal("Notification", "(" + window._more_new_failed + ")", "error");
                }
                SeachUser();
            }
        });
    }
}


// CẬP NHẬP THÔNG TIN CỦA NGƯỜI DÙNG 
function EditUser() {

    $.ajax({
        url: "/User/EditUser",
        data: $("#Form_EditUser").serialize(),
        success: function (result) {
            if (result == 1) {
                $("#Modal_EditUser").hide();
                swal("Notification!", "" + window._updated_succesfully + "", "success");
            }
            else {
                swal("Notification", "(" + window._failed_update + " )", "error");
            }
            SeachUser();
        }
    });
}

// LẤY THÔNG TIN NGƯỜI DÙNG THEO MÃ 
function GetUserById(Id) {
    $.ajax({
        url: "/User/GetUserById",
        data: { Id: Id },
        success: function (result) {
            $("#txtEditUserName").val(result.UserName);
            $("#txtEditUserId").val(result.ID);
            $("#txtEditRole").val(result.Role);
            $("#Modal_EditUser").show();
        }
    });
}



// HIỆN THỊ MODAL XÁC NHẬN XÓA THÔNG TIN NGƯỜI DÙNG 
var IDDelete = 0;
function ShowFromDeleteUser(Id) {
    IDDelete = Id;
    $("#Delete_Users").show();
}


// XÓA THÔNG TIN NGƯỜI DÙNG 
function DelUser() {
    $.ajax({
        url: "/User/DeleteUser",
        data: { Id: IDDelete },
        success: function (result) {
            if (result == 1) {
                $("#Delete_Users").hide();
                swal("Notification!", "" + window._deleted_succesfully + "", "success");
            }
            else {
                swal("Notification!", "(" + window._deletion_failed + ")", "error");
            }

            SeachUser();
        }
    });
}


// ĐĂNG NHẬP TÀI KHOẢN 
function LoginAdmin() {
    var userName = $("#txtUserName").val();
    var passWord = $("#txtPassword").val();
    $.ajax({
        url: "/User/LoginAction",
        data: { UserName: userName, Password: passWord },
        type: "POST",
        success: function (result) {
            if (result == 1) {
                window.location.href = "/Home/Index";
            }
            else {
                swal("Notification", "(" + window._Login_No_Sucess + ")", "error");
            }

        },
        error: function (errr) {

        }
    });
}


//----------------------------------------------------------(2: CONTTACT )---------------------------------------------------------
// TÌM KIẾM THÔNG TIN GIỚI THIỆU 

function SeachContact() {
    $.ajax({
        url: "/Contact/Seach",
        data: {
            Page: 1,
            Name: $("#txtSeachNameContact").val(),
            Phone: $("#txtSeachPhoneContact").val(),
        },
        success: function (result) {
            $("#Table_Contact").html(result);
        }
    });
}


// THÊM MỚI THÔNG TIN GIỚI THIỆU 
function AddContact() {
    //var value = CKEDITOR.instances['AddContactDescription'].getData();

    //// gán dữ liệu trong thông tin chi tiết của loại sản phẩm vào ô textbox 
    //$('#txtAddContactDescription').val(value);

    $.ajax({
        type: "POST",
        url: "/Contact/AddContact",
        data: $("#FormAdd_Contact").serialize(),
        success: function (result) {
            if (result == 1) {
                $("#Modal_AddContact").hide();
                swal("Notification!", "" + window._added_new_contact_succesfully + "", "success");
                SeachContact();
            }
            else {
                swal("Notification", "(" + window._more_new_failed + ")", "error");
            }
            SeachContact();
        }
    });
}

// XÓA THÔNG TIN GIỚI THIỆU 


var IDDeleteContact = 0;
function ShowFromDeleteContact(Id) {
    IDDeleteContact = Id;
    $("#Delete_Contact").show();
}

function DelContact() {
    $.ajax({
        url: "/Contact/DeleteContact",
        data: { Id: IDDeleteContact },
        success: function (result) {
            if (result == 1) {
                $("#Delete_Contact").hide();
                swal("Notification!", "" + window._deleted_succesfully + "", "success");
            }
            else if (result == 0) {
                swal("Notification", "(" + window._deletion_failed + ")", "error");
            }
            SeachContact();
        }
    });
}

// LẤY THÔNG TIN LIÊN HỆ THEO ID 

function GetContactById(Id) {
    $.ajax({
        url: "/Contact/GetContactById",
        data: { Id: Id },
        success: function (result) {

            //// XÓA DANH SÁCH CÁCH CKEDITOR CŨ 
            //for (name in CKEDITOR.instances) {
            //    CKEDITOR.instances[name].destroy(true);
            //}
            //CKEDITOR.remove("divDescriptionContact");
            //$("#divDescriptionContact textarea").remove();

            //// THÊM CKERDIOR MỚI 
            //$("#divDescriptionContact").append('  <textarea id="EditContactDescription" class="EditContactDescription" >' + result.Description + '</textarea>');

            // GÁN DỮ LIỆU CHO INOUT 

            $("#txtIdEditContact").val(result.ID);
            $("#txtNameEditContact").val(result.Name);
            $("#txtPhoneEditContact").val(result.Phone);
            $("#Modal_EditContact").show();
            //CKEDITOR.replace("EditContactDescription");
            //CKFinder.setupCKEditor(null, '/ckfinder');
        }
    });
}

// CẬP NHẬP THÔNG TIN GIỚI THIỆU 

function EditContact() {

    //var value = CKEDITOR.instances['EditContactDescription'].getData();

    //// gán dữ liệu trong thông tin chi tiết của loại sản phẩm vào ô textbox 
    //$('#txtEditContactDescription').val(value);


    $.ajax({
        type: "POST",
        url: "/Contact/EditContact",
        data: $("#Form_EditContact").serialize(),
        success: function (result) {
            if (result == 1) {
                $("#Modal_EditContact").hide();
                swal("Notification!", "" + window._updated_succesfully + "", "success");
            }
            else if (result == 0) {
                swal("Notification", "(" + window._failed_update + " )", "error");
            }
            SeachContact();
        }
    });
}


//----------------------------------------------------------(2: CATEGORY )---------------------------------------------------------
// TÌM KIẾM THÔNG TIN DOANH MỤC 

function SeachCategory() {
    $.ajax({
        url: "/Category/Seach",
        data: {
            Page: 1,
            Name: $("#txtSeachNameCategory").val(),
        },
        success: function (result) {
            $("#Table_Category").html(result);
        }
    });
}


// THÊM MỚI THÔNG TIN DAONH MỤC
function AddCategory() {

    $.ajax({
        type: "POST",
        url: "/Category/AddCategory",
        data: $("#FormAdd_Category").serialize(),
        success: function (result) {
            if (result) {
                $("#Modal_AddCategory").hide();
                swal("Notification!", "" + window._added_new_category_succesfully + "", "success");

                $("#txtAddLogoCategory").val("");
                $("#AddCategoryName").val("");
            }
            else {
                swal("Notification", "(" + window._more_new_failed + ")", "error");
            }
            SeachCategory();
        }
    });
}

// LẤY THÔNG TIN DOANH MỤC THEO ID 
function GetCategoryById(Id) {
    $.ajax({
        url: "/Category/GetCategoryById",
        data: { Id: Id },
        success: function (result) {
            $('.ImageEditLogoCategory').remove();
            $('#divEditLogoImageCategory').append('<img src="' + result.UrlLogo + '" style="height:100px ; width:100%;"  class="ImageEditLogoCategory"/>')
            $("#txtEditLogoCategory").val(result.UrlLogo);
            $("#EditCategoryName").val(result.Name);
            $("#txtEditCategoryID").val(result.ID);
            $("#Modal_EditCategory").show();
        }
    });
}





// CẬP NHẬP THÔNG TIN DOANH MỤC 
function EditCategory() {

    $.ajax({
        type: "POST",
        url: "/Category/EditCategory",
        data: $("#FormEdit_Category").serialize(),
        success: function (result) {
            if (result == 1) {
                $("#Modal_EditCategory").hide();
                var page = $("#txtCategoryPage").val();
                var Name = $("#txtCategoryname").val();
                $.ajax({
                    url: "/Category/Seach",
                    data: {
                        Page: page,
                        Name: Name,
                    },
                    success: function (result) {
                        $("#Table_Category").html(result);
                    }
                });

                swal("Notification!", "" + window._updated_succesfully + "", "success");
            }
            else if (result == 0) {
                swal("Notification", "(" + window._failed_update + " )", "error");
            }

        }
    });
}


// XÓA THÔNG TIN DOANH MỤC 
var IDDeleteCategory = 0;
function ShowFromDeleteCategory(Id) {
    IDDeleteCategory = Id;

    $("#Delete_Category").show();
}

function DelCategory() {
    $.ajax({
        url: "/Category/DeleteCategory",
        data: { Id: IDDeleteCategory },
        success: function (result) {
            if (result == 1) {
                $("#Delete_Category").hide();
                var page = $("#txtCategoryPage").val();
                var Name = $("#txtCategoryname").val();
                $.ajax({
                    url: "/Category/Seach",
                    data: {
                        Page: page,
                        Name: Name,
                    },
                    success: function (result) {
                        $("#Table_Category").html(result);
                    }
                });

                swal("Notification!", "" + window._deleted_succesfully + "", "success");
            }
            else if (result == 0) {
                swal("Notification", "(" + window._deletion_failed + ")", "error");
            }
            else if (result == -1) {
                swal("Notification", "(" + window._Not_allowed_to_delete + ")", "error");
            }
        }
    });
}

function getGropPCategory() {
    $.ajax({
        url: "/Category/GetSelectCategory",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.txtSeachPlaceByCategoryId').append($('<option>', {
                    value: result.ID,
                    text: result.Name
                }));

            });
        }
    });
}



$(document).ready(function () {

    getGropPCategory();

    $("#btnAddContact").click(function () {
        $("#Modal_AddContact").show();
    })

    $("#txtSeachPromotionStartDate").datepicker();
    $("#txtSeachPromotionEndDate").datepicker();

    $('#myInput').attr("placeholder", window._User_Name);
});



//----------------------------------------------------------(2:QUẢN LÝ PROMOTION )---------------------------------------------------------


// TÌM KIẾN THÔNG TIN CỦA QUẢNG CÁO 
function SeachPromotion() {
    var StartDate = $("#txtSeachPromotionStartDate").val();
    var EndDate = $("#txtSeachPromotionEndDate").val();
    if (StartDate > EndDate) {
        swal("Notification", "(search error [start date is greater than end date])", "error");
    }
    else {
        $.ajax({
            url: "/Promotion/Seach",
            data: {
                Page: 1,
                Name: $("#txtSeachPromotionByName").val(),
                PlaceId: $("#txtSeachPromotionByPlaceID").val(),
                StartDate: $("#txtSeachPromotionStartDate").val(),
                EndDate: $("#txtSeachPromotionEndDate").val(),

            },
            success: function (result) {
                $("#Table_Promotion").html(result);
            }
        });
    }
}


//THÊM MỚI THÔNG TIN kHUYỄN MÃI
function AddPromotion() {

    //var value = CKEDITOR.instances['txtAddDescriptionPromotionCkeditor'].getData();
    //// gán dữ liệu trong thông tin chi tiết của loại sản phẩm vào ô textbox 
    //$('#txtAddDescriptionPromotion').val(value);

    $.ajax({
        type: "POST",
        url: "/Promotion/AddPromotion",
        data: $("#FormAdd_Promotion").serialize(),
        success: function (result) {
            if (result == 1) {

                swal("Notification!", "" + window._added_new_advertisement_succesfully + "", "success");
                window.location = "/Promotion/index";
            }
            else if (result == 0) {
                swal("Notification", "(" + window._more_new_failed + ")", "error");
            }
            else if (result == -2) {
                swal("Notification", "(" + window._Place_do_not_leave_blank + ")", "error");
            }

            else if (result == -1) {
                swal("Notification", "(" + window._Promotion_name_do_not_leave_blank + ")", "error");
            }

            else if (result == -3) {
                swal("Notification", "(" + window._start_date_running_do_not_leave_blank + ")", "error");
            }
            SeachPromotion();
        }
    });
}


//CẬP NHẬP THÔNG TIN KHUYỄN MÃI 

function EditPromotion() {


    $.ajax({
        type: "POST",
        url: "/Promotion/EditPromotion",
        data: $("#Form_EditPromotion").serialize(),
        success: function (result) {

            if (result == 1) {

                var PromotionPage = $("#txtSeachUpdatePromotionpage").val();
                var PromotionName = $("#txtSeachUpdatePromotionName").val();
                var PlaceID = $("#txtSeachUpdatePromotionPlaceId").val();
                var PromotionStartDate = $("#txtSeachUpdatePromotionStartDate").val();
                var PromotionEndDate = $("#txtSeachUpdatePromotionEndDate").val();

                swal("Notification!", "" + window._updated_succesfully + "", "success");
                window.location = "/Promotion/LoadPage?page=" + PromotionPage + "&Name=" + PromotionName + "&PlaceId=" + PlaceID + "&StartDate=" + PromotionStartDate + "&EndDate=" + PromotionEndDate;
            }
            else if (result == 0) {
                swal("Notification", "(" + window._failed_update + " )", "error");
            }
            else if (result == -2) {
                swal("Notification", "(" + window._Place_do_not_leave_blank + ")", "error");
            }

            else if (result == -1) {
                swal("Notification", "(" + window._Promotion_name_do_not_leave_blank + ")", "error");
            }

            else if (result == -3) {
                swal("Notification", "(" + window._start_date_running_do_not_leave_blan + ")", "error");
            }
            SeachPromotion();

        }
    });
}


// XÓA THÔNG TIN DOANH MỤC 
var IDDeletePromotion = 0;
function ShowFromDeletePromotion(Id) {
    IDDeletePromotion = Id;
    $("#Delete_Promotion").show();
}

function DelPromotion() {
    $.ajax({
        url: "/Promotion/DeletePromotion",
        data: { Id: IDDeletePromotion },
        success: function (result) {
            if (result == 1) {
                $("#Delete_Promotion").hide();

                var PromotionPage = $("#txtUpdatePromotionpage").val();
                var PromotionName = $("#txtUpdatePromotionName").val();
                var PlaceID = $("#txtUpdatePromotionPlaceId").val();
                var PromotionStartDate = $("#txtUpdatePromotionStartDate").val();
                var PromotionEndDate = $("#txtUpdatePromotionEndDate").val();
                $.ajax({
                    url: "/Promotion/Seach",
                    data: {
                        Page: PromotionPage,
                        Name: PromotionName,
                        PlaceId: PlaceID,
                        StartDate: PromotionStartDate,
                        EndDate: PromotionEndDate,
                    },
                    success: function (result) {
                        $("#Table_Promotion").html(result);
                    }
                });
                swal("Notification!", "" + window._deleted_succesfully + "", "success");
            }
            else if (result == 0) {
                swal("Notification", "(" + window._deletion_failed + ")", "error");
            }

        }

    });
}

//----------------------------------------------------------(2:CẬP NHẬP THÔNG TIN TÀI NGUYÊN HỆ THÔNG )---------------------------------------------------------

// TÌM KIẾM THÔNG TIN TÀI NGUYÊN CỦA HỆ THỐNG 
function SeachMedia() {
    $.ajax({
        url: "/Media/Seach",
        data: {
            Page: 1,
            PlaceID: $("#txtSeachMediaByPlaceID").val(),
            PromotionID: $("#txtSeachMediaByPromotionId").val(),
            Type: $("#txtSeachMediaType").val(),
        },
        success: function (result) {
            $("#Table_Media").html(result);
        }
    });
}


// XOÁ THÔNG TIN TAI NGUYÊN CỦA HỆ THÔNG 
var IDDeleteMedia = 0;
function ShowFromDeleteMedia(Id) {
    IDDeleteMedia = Id;
    $("#Delete_Media").show();
}

function DelMedia() {
    $.ajax({
        url: "/Media/DeleteMedia",
        data: { Id: IDDeleteMedia },
        success: function (result) {
            if (result == 1) {
                $("#Delete_Media").hide();

                var MediaType = $("#txtUpdateMediaType").val();
                var MediaPage = $("#txtUpdateMediaPage").val();
                var MediaPlaceID = $("#txtUpdateMediaPlaceID").val();
                var MediaPromotionID = $("#txtUpdateMediaPromotionID").val();

                $.ajax({
                    url: "/Media/Seach",
                    data: {
                        Page: MediaPage,
                        PlaceID: MediaPlaceID,
                        PromotionID: MediaPromotionID,
                        Type: MediaType,
                    },
                    success: function (result) {
                        $("#Table_Media").html(result);
                    }
                });

                swal("Notification!", "" + window._deleted_succesfully + "", "success");
            }
            else if (result == 0) {
                swal("Notification", "(" + window._deletion_failed + ")", "error");
            }
            SeachMedia();
        }
    });
}


// THÊM MỚI THÔNG TIN CỦA CỬA HÀNG 
function AddMedia() {


    $.ajax({

        url: "/Media/AddMedia",
        data: $("#FormAdd_Media").serialize(),

        success: function (result) {
            if (result == 1) {

                swal("Notification!", "" + window._added_new_media_succesfully + "", "success");
                window.location = "/Media/index";
            }
            else if (result == -1) {
                swal("Notification", "(" + window._place_does_not_exist + ")", "error");
            }
            else if (result == -2) {
                swal("Notification", "(" + window._Promotion_does_not_exist + ")", "error");
            }
            else if (result == 0) {
                swal("Notification", "( " + window._more_new_failed + ")", "error");
            }
            else {
                swal("Notification", "(" + window._Url_Logo_does_not_exist + ")", "error");
            }
            SeachMedia();
        }
    });
}

function EditPost() {
    var value = CKEDITOR.instances['txtEditDescriptionPostCkeditor'].getData();



    $('#txt_edit_Description_Post').val(value);
    $.ajax({
        type: "POST",
        url: "/Post/Edit",
        data: $("#FormEdit_Post").serialize(),
        success: function (result) {


            if (result == 1) {
                $("#Modal_Add_Parent").hide();
                swal("Notification!", "" + window._added_new_contact_post + "", "success");
                setTimeout(function () {
                    window.location = "/Post/index";
                }, 1000);

            }
            else if (result == -1) {
                swal("Notification!", "" + window._Category_cannot_leave_blank + "", "error");

            }
            else if (result == -2) {
                swal("Notification!", "" + window._Address_cannot_leave_blank + "", "error");

            }
            else if (result == -3) {
                swal("Notification!", "" + window._Status_cannot_leave_blank + "", "error");

            }
            else if (result == -4) {
                swal("Notification!", "" + window._User_cannot_leave_blank + "", "error");

            } else {
                swal("Notification!", "" + window._more_new_failed + "", "error");
            }
        }
    });
}
function AddPosts() {
    var value = CKEDITOR.instances['txtAddDescriptionPlaceCkeditor'].getData();
    $("#txt_add_Description_Post").val(value);
    $.ajax({
        type: "POST",
        url: "/Post/AddPost",
        data: $("#FormAdd_Post").serialize(),
        success: function (result) {
            if (result == 1) {
                swal("Notification!", "" + window._updated_succesfully + "", "success");
                window.location = "/Post/Index";

            } else if (result == -1) {
                swal("Notification!", "" + window._Category_cannot_leave_blank + "", "error");

            }
            else if (result == -2) {
                swal("Notification!", "" + window._Address_cannot_leave_blank + "", "error");

            }
            else if (result == -3) {
                swal("Notification!", "" + window._Status_cannot_leave_blank + "", "error");

            }
            else if (result == -4) {
                swal("Notification!", "" + window._User_cannot_leave_blank + "", "error");

            } else {
                swal("Notification!", "" + window._more_new_failed + "", "error");
            }


        }
    });
}



// THÊM MỚI THÔNG TIN CỦA CỬA HÀNG 
function EditMedia() {
    $.ajax({

        url: "/Media/EditMedia",
        data: $("#FormEdit_Media").serialize(),

        success: function (result) {
            if (result == 1) {

                swal("Notification!", "" + window._updated_succesfully + "", "success");
                window.location = "/Media/index";
            }
            else if (result == -1) {
                swal("Notification", "(" + window._place_does_not_exist + ")", "error");
            }
            else if (result == -2) {
                swal("Notification", "(" + window._Promotion_does_not_exist + ")", "error");
            }
            else if (result == 0) {
                swal("Notification", "( " + window._failed_update + " )", "error");
            }
            else {
                swal("Notification", "(" + window._Url_Logo_does_not_exist + ")", "error");
            }
            SeachMedia();
        }
    });
}

//----------------------------------------------------------(2:CẬP NHẬP THÔNG TIN QUẢNG CÁO)---------------------------------------------------------


// TÌM KIẾM THÔNG TIN CỦA QUẢNG CÁO 
function SeachAds() {
    $.ajax({
        url: "/Ads/Seach",
        data: {
            Page: 1,
            PlaceId: $("#txtSeachAdsByPlaceID").val(),
            StartDate: $("#txtSeachAdsStartDate").val(),
            EndDate: $("#txtSeachAdsEndDate").val(),

        },
        success: function (result) {
            $("#Table_Ads").html(result);
        }
    });
}



// XÓA THÔNG TIN QUẢNG CÁO 
var IDDeleteAds = 0;
function ShowFromDeleteAds(Id) {
    IDDeleteAds = Id;
    $("#Delete_Ads").show();
}

function DelAds() {
    $.ajax({
        url: "/Ads/DeleteAds",
        data: { Id: IDDeleteAds },
        success: function (result) {
            if (result == 1) {
                $("#Delete_Ads").hide();
                SeachAds();
                swal("Notification!", "" + window._deleted_succesfully + "", "success");
            }
            else if (result == 0) {
                swal("Notification", "(" + window._deletion_failed + ")", "error");
            }

            $.ajax({
                url: "/Ads/Seach",
                data: {
                    Page: 1,
                    PlaceId: $("#txtSeachAdsByPlaceID").val(),
                    StartDate: $("#txtSeachAdsStartDate").val(),
                    EndDate: $("#txtSeachAdsEndDate").val(),

                },
                success: function (result) {
                    $("#Table_Ads").html(result);
                }
            });
        }

    });
}


// THÊM MỚI THÔNG TIN CỦA CỬA HÀNG 
function AddAds() {


    $.ajax({

        url: "/Ads/AddAds",
        data: $("#FormAdd_Ads").serialize(),

        success: function (result) {
            if (result == 1) {

                swal("Notification!", "" + window._added_new_advertisement_succesfully + "", "success");
                window.location = "/Ads/index";
            }
            else if (result == -1) {
                swal("Notification", "(" + window._place_does_not_exist + ")", "error");
            }
            else if (result == -2) {
                swal("Notification", "(" + window._Time_illegal + ")", "error");
            }
            else {
                swal("Notification", "(" + window._more_new_failed + ")", "error");
            }

            $.ajax({
                url: "/Ads/Seach",
                data: {
                    Page: 1,
                    PlaceId: $("#txtSeachAdsByPlaceID").val(),
                    StartDate: $("#txtSeachAdsStartDate").val(),
                    EndDate: $("#txtSeachAdsEndDate").val(),

                },
                success: function (result) {
                    $("#Table_Ads").html(result);
                }
            });
        }
    });
}


// THÊM MỚI THÔNG TIN CỦA CỬA HÀNG 
function EditAds() {
    $.ajax({

        url: "/Ads/EditAds",
        data: $("#FormEdit_Ads").serialize(),

        success: function (result) {
            if (result == 1) {


                window.location = "/Ads/index";
                swal("Notification!", "" + window._updated_succesfully + "", "success");
            }
            else if (result == -1) {
                swal("Notification", "(" + window._place_does_not_exist + ")", "error");
            }
            else if (result == -2) {
                swal("Notification", "(" + window._Time_illegal + ")", "error");
            }
            else if (result == 0) {
                swal("Notification", "(" + window._failed_update + " )", "error");

            }
            else {
                swal("Notification", "(" + window._Url_Logo_does_not_exist + ")", "error");
            }
            SeachAds();
        }
    });
}

//----------------------------------------------------------(2:QUẢN LÝ THÔNG TIN CỬA HÀNG)---------------------------------------------------------

// TÌM KIẾM THÔNG TIN CỦA CỬA HÀNG
function SeachPlace() {
    $.ajax({
        url: "/Place/Seach",
        data: {
            Page: 1,
            Count: $("#txt_add_list_count_place").val(),
            Name: $("#txtSeachPlaceByName").val(),
            CategoryId: $("#txtSeachPlaceByCategoryId").val(),
        },
        success: function (result) {
            $("#Table_Place").html(result);
        }
    });
}



// XÓA THÔNG TIN CỬA HÀNG
var IDDeletePlace = 0;
function ShowFromDeletePlace(Id) {
    IDDeletePlace = Id;
    $("#Delete_Place").show();
}


// xóa thông tin cua ngươi dùng 
function DelPlace() {
    $.ajax({
        url: "/Place/DeletePlace",
        data: { Id: IDDeletePlace },
        success: function (result) {
            if (result == 1) {
                $("#Delete_Place").hide();
                var page = $("#txtSeachUpdatePage").val();
                var Name = $("#txtSeachUpdatePlaceName").val();
                var Category = $("#txtSeachUpdateCategory").val();
                var count = $("#txtSeachUpdateCount").val();

                $.ajax({
                    url: "/Place/Seach",
                    data: {
                        Page: page,
                        Count: count,
                        Name: Name,
                        CategoryId: Category,
                    },
                    success: function (result) {
                        $("#Table_Place").html(result);
                        swal("Notification!", "" + window._deleted_succesfully + "", "success");
                    }
                });

            }
            else if (result == 0) {
                swal("Notification", "(" + window._deletion_failed + ")", "error");
            }
        }
    });
}


// A $( document ).ready() block.
$(document).ready(function () {
    $("#txt_add_list_count_place").change(function () {
        $.ajax({
            url: "/Place/Seach",
            data: {
                Page: 1,
                Count: $("#txt_add_list_count_place").val(),
                Name: $("#txt,ByName").val(),
                CategoryId: $("#txt,ByCategoryId").val(),
            },
            success: function (result) {
                $("#Table_Place").html(result);
            }
        });
    });

    $("#add_logo_place").off('click').on('click', function (e) {
        e.preventDefault();
        var fider = new CKFinder();

        fider.selectActionFunction = function (fileUrl) {
            $("#AddImgLogoPlace ").remove();
            $("#AddLogoPlace").append('<div class="thumb" style="background-image: url(' + fileUrl + ');" id="AddImgLogoPlace" title="logo của cửa hàng"> </div>');
            var url = window.location.origin + fileUrl;
            $('#txtAddLogoPlace').val(url);
        }
        fider.popup();

    });

    $("#add_banner_place").off('click').on('click', function (e) {
        e.preventDefault();
        var fider = new CKFinder();
        fider.selectActionFunction = function (fileUrl) {
            $("#AddImgBannerPlace").remove();
            $("#AddBannerPlace").append('<div class="thumb" style="background-image: url(' + fileUrl + ');" id="AddImgBannerPlace" title="Banner của cửa hàng"></div>');
            var url = window.location.origin + fileUrl;
            $('#txtAddBannerPlace').val(url);
        }
        fider.popup();

    });



    $("#Edit_logo_place").off('click').on('click', function (e) {
        e.preventDefault();
        var fider = new CKFinder();
        fider.selectActionFunction = function (fileUrl) {
            $("#EditImgLogoPlace ").remove();
            $("#EditLogoPlace").append('<div class="thumb" style="background-image: url(' + fileUrl + ');" id="EditImgLogoPlace" title="logo của cửa hàng"> </div>');
            var url = window.location.origin + fileUrl;
            $('#txtEditLogoPlace').val(url);
        }
        fider.popup();

    });

    $("#Edit_banner_place").off('click').on('click', function (e) {
        e.preventDefault();
        var fider = new CKFinder();
        fider.selectActionFunction = function (fileUrl) {
            $("#EditImgBannerPlace").remove();
            $("#EditBannerPlace").append('<div class="thumb" style="background-image: url(' + fileUrl + ');" id="EditImgBannerPlace" title="Banner của cửa hàng"></div>');
            var url = window.location.origin + fileUrl;
            $('#txtEditBannerPlace').val(url);
        }
        fider.popup();

    });


    $("#Add_Imgae_Promotion").off('click').on('click', function (e) {
        e.preventDefault();
        var fider = new CKFinder();
        fider.selectActionFunction = function (fileUrl) {
            $(".AddImagePromotion ").remove();
            $("#ImageAddPromotion").append("<img src='" + fileUrl + "' style='width: 100%; height: 100%; ' class='AddImagePromotion' title='Hình ảnh loại sản phẩm'/>");
            var url = window.location.origin + fileUrl;
            $('#txtAddUrlImagePromotion').val(url);
        }
        fider.popup();

    });

    $("#Edit_Imgae_Promotion").off('click').on('click', function (e) {
        e.preventDefault();
        var fider = new CKFinder();
        fider.selectActionFunction = function (fileUrl) {
            $(".EditImagePromotion ").remove();
            $("#ImageEditPromotion").append("<img src='" + fileUrl + "' style='width: 100%; height: 100%; ' class='EditImagePromotion' title='Hình ảnh loại sản phẩm'/>");
            var url = window.location.origin + fileUrl;
            $('#txtEditUrlImagePromotion').val(url);
        }
        fider.popup();

    });



    //$("#btn_edit_banner_ads").off('click').on('click', function (e) {
    //    e.preventDefault();
    //    var fider = new CKFinder();
    //    fider.selectActionFunction = function (fileUrl) {
    //        $(".Image_edit_banner_place ").remove();
    //        $("#Banner_edit_Place").append('<img src="' + dt.UrlBanner + '" style="width:100%; height:auto" id="Image_edit_banner_place"/>')
    //        var url = window.location.origin + fileUrl;
    //        $('#Url_Edit_Baner_Place').val(url);
    //    }
    //    fider.popup();

    //});


    $("#btnAddMediaPlaces").click(function () {
        $('#Modal_AddMedia').show();

    })
    $("#txt_add_Galary_Post").click(function () {
        $('#Modal_Add_Media_Media').show();

    })

    $(".btnCloseEditMediaPlaces").click(function () {
        $('#Modal_EditMedia').hide();

    })


    $(".BtnCloseAddMediapost").click(function () {
        $('#Modal_Add_Media_Media').hide();

    })



    $("#btneditMediaPlaces").click(function () {
        $('#Modal_AddMedia').show();

    })

    $(".btnCloseAddMediaPlaces").click(function () {
        $('#Modal_AddMedia').hide();

    })





    $("#btnSelectMedia").click(function () {
        var fider = new CKFinder();
        fider.selectActionFunction = function (fileUrl) {
            var url = window.location.origin + fileUrl;
            $('#txtAddUrlMediaIbPlace').val(url);

            $("#divAddMediaPlace").empty();
            $("#divAddMediaPlace").append('<img src="' + url + '" style="width:100%;height:auto" />');
            $("#txtAddTypeMediaIbPlace").val(1);
        }
        fider.popup();

    })

    $("#btnSelectEditMedia").click(function () {
        var fider = new CKFinder();
        fider.selectActionFunction = function (fileUrl) {
            var url = window.location.origin + fileUrl;
            $('#txtEditUrlMediaIbPlace').val(url);

            $("#divEditMediaPlace").empty();
            $("#divEditMediaPlace").append('<img src="' + url + '" style="width:100%;height:auto" />');
            $("#txtEditTypeMediaIbPlace").val(1);
        }
        fider.popup();

    })


    // tiến hành chọn ảnh cho promotion 
    $("#btnEditSelectMediaPro").click(function () {
        var fider = new CKFinder();
        fider.selectActionFunction = function (fileUrl) {
            var url = window.location.origin + fileUrl;
            $('#txtEditUrlMediaPro').val(url);
            $('#txtEditTypeMediaPro').val(1);
            $("#divEditMediaPlacePro").empty();
            $("#divEditMediaPlacePro").append('<img src="' + url + '" style="width:100%;height:auto" />');
        }
        fider.popup();

    })


    // tiến hành chọn ảnh cho promotion 
    $("#btnEditSelectMediaPost").click(function () {
        var fider = new CKFinder();
        fider.selectActionFunction = function (fileUrl) {
            var url = window.location.origin + fileUrl;
            $('#txtEditUrlMediaPost').val(url);
            $('#txtEditTypeMediaPost').val(1);
            $("#divEditMediaPlacePost").empty();
            $("#divEditMediaPlacePost").append('<img src="' + url + '" style="width:100%;height:auto" />');
        }
        fider.popup();

    })

    // tiến hành chọn ảnh cho promotion 
    $("#btnAddSelectMediaPro").click(function () {
        var fider = new CKFinder();
        fider.selectActionFunction = function (fileUrl) {
            var url = window.location.origin + fileUrl;
            $('#txtAddUrlMediaPro').val(url);
            $('#txtAddTypeMediaPro').val(1);
            $("#divAddMediaPlacePro").empty();
            $("#divAddMediaPlacePro").append('<img src="' + url + '" style="width:100%;height:auto" />');
        }
        fider.popup();

    })

    $("#btnAddSelectMediaPost").click(function () {
        var fider = new CKFinder();
        fider.selectActionFunction = function (fileUrl) {
            var url = window.location.origin + fileUrl;
            $('#txtAddUrlMediaPost').val(url);
            $('#txtAddTypeMediaPost').val(1);
            $("#divAddMediaPlacePost").empty();
            $("#divAddMediaPlacePost").append('<img src="' + url + '" style="width:100%;height:auto" />');
        }
        fider.popup();

    })




    $("#BtnAddMediaPromotion").click(function () {
        $('#Modal_Add_Media_Promotion').show();

    })

    $(".BtnCloseAddMediaPromotion").click(function () {
        $('#Modal_Add_Media_Promotion').hide();

    })

    // thông tin cập nhập bản ghi 
    $("#BtnEditMediaPromotion").click(function () {
        $('#Modal_Edit_Media_Promotion').show();

    })

    $("#BtnEditMediaPost").click(function () {
        $('#Modal_Edit_Media_Post').show();

    })

    $(".BtnCloseEditMediapost").click(function () {
        $('#Modal_Edit_Media_Post').hide();

    })


    $(".BtnCloseEditMediaPromotion").click(function () {
        $('#Modal_Edit_Media_Promotion').hide();

    })

    // add image vào danh sach 
    $("#btn_sever_image").click(function () {

        var type = $("#txtAddTypeMediaIbPlace").val();
        var url = $("#txtAddUrlMediaIbPlace").val();


        if (url == "") {
            swal("Notification!", "bắt buộc phải chọn media", "error");
        }
        else if (type == 0) {
            swal("Notification!", "Bắt buộc phải chọn loại media", "error");
        }
        else {
            $.ajax({
                url: "/Place/AddSesstionAddMedia",
                data: {
                    Type: $("#txtAddTypeMediaIbPlace").val(),
                    Url: $("#txtAddUrlMediaIbPlace").val(),
                },
                success: function (result) {
                    if (result == 1) {
                        $.ajax({
                            url: "/Place/GetSesstionAddMedia",
                            success: function (vaule) {
                                $("#ContentListMedia").html(vaule);
                                $('#Modal_AddMedia').hide();
                                $("#txtAddTypeMediaIbPlace").val('');
                                $("#txtAddUrlMediaIbPlace").val('');
                                $("#divAddMediaPlace").empty();
                            }
                        });
                    }

                }
            });
        }
    })

    // add image vào danh sách cập nhập
    $("#btn_sever_Eidt_media_pro").click(function () {

        var type = $("#txtEditTypeMediaPro").val();
        var url = $("#txtEditUrlMediaPro").val();


        if (url == "") {
            swal("Notification!", "bắt buộc phải chọn media", "error");
        }
        else if (type == 0) {
            swal("Notification!", "Bắt buộc phải chọn loại media", "error");
        }
        else {
            $.ajax({
                url: "/Promotion/AddSesstionAddMedia",
                data: {
                    Type: $("#txtEditTypeMediaPro").val(),
                    Url: $("#txtEditUrlMediaPro").val(),
                },
                success: function (result) {
                    if (result == 1) {
                        $.ajax({
                            url: "/Promotion/GetSesstionAddMedia",
                            success: function (vaule) {
                                $("#ContentEditListMediaPromotion").html(vaule);
                                $('#Modal_Edit_Media_Promotion').hide();
                                $("#txtEditTypeMediaPro").val('');
                                $("#txtEditUrlMediaPro").val('');
                                $("#divEditMediaPlacePro").empty();
                            }
                        });
                    }

                }
            });
        }
    })

    // add image vào danh sách cập nhập
    $("#btn_sever_Eidt_media_Post").click(function () {

        var type = $("#txtEditTypeMediaPost").val();
        var url = $("#txtEditUrlMediaPost").val();


        if (url == "") {
            swal("Notification!", "bắt buộc phải chọn media", "error");
        }
        else if (type == 0) {
            swal("Notification!", "Bắt buộc phải chọn loại media", "error");
        }
        else {
            $.ajax({
                url: "/Post/AddSesstionAddMedia",
                data: {
                    Type: $("#txtEditTypeMediaPost").val(),
                    Url: $("#txtEditUrlMediaPost").val(),
                },
                success: function (result) {
                    if (result == 1) {
                        $.ajax({
                            url: "/Post/GetSesstionAddMedia",
                            success: function (vaule) {
                                $("#ContentEditListMediaPost").html(vaule);
                                $('#Modal_Edit_Media_Post').hide();
                                $("#txtEditTypeMediaPost").val('');
                                $("#txtEditUrlMediaPost").val('');
                                $("#divEditMediaPlacePost").empty();
                            }
                        });
                    }

                }
            });
        }
    })





    // tiến hành thêm danh sách hình ảnh cho proromotion 
    $("#btn_sever_media_pro").click(function () {

        var type = $("#txtAddTypeMediaPro").val();
        var url = $("#txtAddUrlMediaPro").val();


        if (url == "") {
            swal("Notification!", "bắt buộc phải chọn media", "error");
        }
        else if (type == 0) {
            swal("Notification!", "Bắt buộc phải chọn loại media", "error");
        }
        else {
            $.ajax({
                url: "/Promotion/AddSesstionAddMedia",
                data: {
                    Type: $("#txtAddTypeMediaPro").val(),
                    Url: $("#txtAddUrlMediaPro").val(),
                },
                success: function (result) {
                    if (result == 1) {
                        $.ajax({
                            url: "/Promotion/GetSesstionAddMedia",
                            success: function (vaule) {
                                $("#ContentAddListMediaPromotion").html(vaule);
                                $('#Modal_Add_Media_Promotion').hide();
                                $("#txtAddUrlMediaPro").val('');
                                $("#txtAddTypeMediaPro").val('');
                                $("#divAddMediaPlacePro").empty();
                            }
                        });
                    }

                }
            });
        }

    })




    // tiến hành thêm mới media cho session post 
    $("#btn_sever_media_post").click(function () {

        var type = $("#txtAddTypeMediaPost").val();
        var url = $("#txtAddUrlMediaPost").val();


        if (url == "") {
            swal("Notification!", "url cannot be blank", "error");
        }
        else if (type == 0) {
            swal("Notification!", "type cannot be blank", "error");
        }
        else {
            $.ajax({
                url: "/Post/AddSesstionAddMedia",
                data: {
                    Type: $("#txtAddTypeMediaPost").val(),
                    Url: $("#txtAddUrlMediaPost").val(),
                },
                success: function (result) {
                    if (result == 1) {
                        $.ajax({
                            url: "/Post/GetSesstionAddMedia",
                            success: function (vaule) {
                                $("#ContentListMediaInPost").html(vaule);
                                $('#Modal_Add_Media_Media').hide();
                                $("#txtAddUrlMediaPost").val('');
                                $("#txtAddTypeMediaPost").val('');
                                $("#divAddMediaPlacePost").empty();
                            }
                        });
                    }

                }
            });
        }

    })





    $("#btn_Edit_sever_image").click(function () {

        var type = $("#txtEditTypeMediaIbPlace").val();
        var url = $("#txtEditUrlMediaIbPlace").val();


        if (url == "") {
            swal("Notification!", "bắt buộc phải chọn media", "error");
        }
        else if (type == 0) {
            swal("Notification!", "Bắt buộc phải chọn loại media", "error");
        }
        else {
            $.ajax({
                url: "/Place/AddSesstionAddMedia",
                data: {
                    Type: $("#txtEditTypeMediaIbPlace").val(),
                    Url: $("#txtEditUrlMediaIbPlace").val(),
                },
                success: function (result) {
                    if (result == 1) {
                        $.ajax({
                            url: "/Place/GetSesstionAddMedia",
                            success: function (vaule) {
                                $("#ContentEditListMedia").html(vaule);
                                $('#Modal_EditMedia').hide();
                                $("#txtEditTypeMediaIbPlace").val('');
                                $("#txtEditUrlMediaIbPlace").val('');
                                $("#divEditMediaPlace").empty();
                            }
                        });
                    }

                }
            });
        }

    })


    $('#btn_edit_media_place').click(function () {
        $('#Modal_EditMedia').show();
    })
});

//// phan đình kiên : xóa thông tin của media 
//function DelteSesstionMeida(url) {

//}

// THÊM MỚI THÔNG TIN CỦA CỬA HÀNG 
function AddPlace() {
    var value = CKEDITOR.instances['txtAddDescriptionPlaceCkeditor'].getData();

    // gán dữ liệu trong thông tin chi tiết của loại sản phẩm vào ô textbox 
    $('#txtAddDescriptionPlace').val(value);
    $.ajax({
        type: "POST",
        url: "/Place/CreatePlace",
        data: $("#FormAdd_Place").serialize(),
        success: function (result) {
            if (result == 1) {

                swal("Notification!", "" + window._added_new_place_succesfully + "", "success");
                window.location = "/Place/index";
            }
            else if (result == -1) {
                swal("Notification", "(" + window._Please_fill_in_the_Place_Name_field + ")", "error");
            }
            else if (result == -2) {
                swal("Notification", "(" + window._Place_category_does_not_exist + ")", "error");
            }
            else if (result == -3) {
                swal("Notification", "(" + window._Address_is_too_long + ")", "error");
            }
            else if (result == -4) {
                swal("Notification", "(" + Url_logo_is_too_lon + ")", "error");
            }
            else if (result == -5) {
                swal("Notification", "(" + window._Phone_is_too_long + ")", "error");
            }
            else if (result == -6) {
                swal("Notification", "(" + window._Website_is_too_long + ")", "error");
            }
            else if (result == -7) {
                swal("Notification", "(" + window._Url_Banner_is_too_long + ")", "error");
            }

            else if (result == -8) {
                swal("Notification", "(" + window._must_first_update_the_media_for_the_place + ")", "error");
            }
            else {
                swal("Notification", "(" + window._more_new_failed + ")", "error");
            }
            SeachCategory();
        }
    });
}


function EditPlace() {

    var value = CKEDITOR.instances['txtEditDescriptionPlaceCkeditor'].getData();

    // gán dữ liệu trong thông tin chi tiết của loại sản phẩm vào ô textbox 
    $('#txtEditDescriptionPlace').val(value);
    $.ajax({
        type: "POST",
        url: "/Place/UpdatePlace",
        data: $("#FormEdit_Place").serialize(),
        success: function (result) {

            if (result == 1) {

                swal("Notification!", "" + window._updated_succesfully + "", "success");

                var page = $("#txtSeachUpdatePages").val();
                var Name = $("#txtSeachUpdatePlaceNames").val();
                var CategoryId = $("#txtSeachUpdateCategorys").val();
                setTimeout(function () {
                    window.location = "/Place/LoadPage?Page=" + page + "&Name=" + Name + "&CategoryId=" + CategoryId;

                }, 2000);

            }
            else if (result == -1) {
                swal("Notification", "(" + window._Please_fill_in_the_Place_Name_field + ")", "error");
            }
            else if (result == -2) {
                swal("Notification", "(" + window._Place_category_does_not_exist + ")", "error");
            }
            else if (result == -3) {
                swal("Notification", "(" + window._Address_is_too_long + ")", "error");
            }
            else if (result == -4) {
                swal("Notification", "(" + Url_logo_is_too_lon + ")", "error");
            }
            else if (result == -5) {
                swal("Notification", "(" + window._Phone_is_too_long + ")", "error");
            }
            else if (result == -6) {
                swal("Notification", "(" + window._Website_is_too_long + ")", "error");
            }
            else if (result == -7) {
                swal("Notification", "(" + window._Url_Banner_is_too_long + ")", "error");
            }

            else if (result == -8) {
                swal("Notification", "(" + window._must_first_update_the_media_for_the_place + ")", "error");
            }

            else {
                swal("Notification", "(" + window._failed_update + ")", "error");
            }


        }
    });
}

var map = "";
var geocoder = "";

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 }
    });
    geocoder = new google.maps.Geocoder();


}

function OnchangeGeocoderAddPlace(text, type) {

    geocodeAddressCreatePlace(geocoder, map, text, type);
}


function geocodeAddressCreatePlace(geocoder, resultsMap, text, type) {
    value = $(text).val();
    var address = value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {

            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });

            swal("Notification", "Pluscode is OK!", "success");

            if (type == 1) {
                $("#txtAddLongitudePlace").val(marker.getPosition().lng());
                $("#txtAddLatitudePlace").val(marker.getPosition().lat());
            } else {
                $("#txtEditLongitudePlace").val(marker.getPosition().lng());
                $("#txtEditLatitudePlace").val(marker.getPosition().lat());
            }


        } else {
            if (type == 1) {
                $("#txtAddLongitudePlace").val(0);
                $("#txtAddLatitudePlace").val(0);
            } else {
                $("#txtEditLongitudePlace").val(0);
                $("#txtEditLatitudePlace").val(0);
            }

            swal("Notification", "Address is not in Google Plus Code!", "error");
        }
    });
}



function OnchangeGeocoderEditPlace(value) {
    geocodeAddressUpdatePlace(geocoder, map, value);
}

function geocodeAddressUpdatePlace(geocoder, resultsMap, value) {
    var address = value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {

            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });

            $("#txtEditLongitudePlace").val(marker.getPosition().lng());
            $("#txtEditLatitudePlace").val(marker.getPosition().lat());


        } else {
            $("#txtEditLongitudePlace").val(0);
            $("#txtEditLatitudePlace").val(0);
            swal("Notification", "(Geocode was not successful)", "error");

        }
    });
}



///--------------------------------------thông tin bài viết 


function SeachPost() {
    $.ajax({
        url: "/Post/Seach",
        data: {
            Page: 1,
            KeyWord: $("#txtSeachKeywordPost").val(),
            UserId: $("#txt_seach_post_by_user").val(),
            Status: $("#txt_seach_post_by_status").val(),
            CategoryId: $("#txt_seach_post_by_category").val(),
            CustId: $("#txt_seach_post_by_cust").val(),
        },
        success: function (result) {
            $("#Table_Post").html(result);
        }
    });
}


function GetSelectProvince() {
    $.ajax({
        url: "/Post/GetSelectProvince",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.Select_Province').append($('<option>', {
                    value: result.ID,
                    text: result.Name
                }));

            });
        }
    });
}


function GetSelectUnit() {
    $.ajax({
        url: "/Post/GetSelectUnit",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.Select_Unit').append($('<option>', {
                    value: result.ID,
                    text: result.Name
                }));

            });
        }
    });
}

function GetSelectUser() {
    $.ajax({
        url: "/User/GetSelect",
        success: function (result) {
            $.each(result, function (i, result) {
                $('.Select_User').append($('<option>', {
                    value: result.ID,
                    text: result.UserName
                }));

            });
        }
    });
}

function ShowUpdateStatus(Status) {
    $("#update_statust_post").val(Status);

    var myArray = "";

    $('#table_post input[type=checkbox]').each(function () {
        if (this.checked) {
            myArray = myArray + $(this).val() + ":";
        }
    });

    if (myArray == "") {
        swal("Notification", "You must select the post before updating", "error");

    }
    else {
        $("#update_List_id_Post").val(myArray);
        $("#Modal_Update_Status").show();
    }

}

function UpdateStatus() {
    $.ajax({
        url: "/Post/UpdateStatus",
        data: {
            ListID: $("#update_List_id_Post").val(),
            Status: $("#update_statust_post").val(),

        },
        success: function (result) {

            if (result == 1) {
                $.ajax({
                    url: "/Post/Seach",
                    data: {
                        Page: $("#txt_seach_post_by_page").val(),
                        KeyWord: $("#txtSeachKeywordPost").val(),
                        UserId: $("#txt_seach_post_by_user").val(),
                        Status: $("#txt_seach_post_by_status").val(),
                        CategoryId: $("#txt_seach_post_by_category").val(),
                    },
                    success: function (result) {
                        $("#Table_Post").html(result);
                        swal("Notification!", "" + window._updated_succesfully + "", "success");
                        $("#Modal_Update_Status").hide();
                    }
                });

            }
            else {
                $("#Modal_Update_Status").hide();
            }
        }
    });
}


function ShowDeletePosst(Id) {

    $("#delete_id_Post").val(Id);
    $("#Modal_Delete_Post").show();
}


function CloseDeletePosst() {
    $("#Modal_Delete_Post").hide();
}



function CloseUpdateStatus() {

    $("#Modal_Update_Status").hide();
}



function DeletePost() {
    $.ajax({
        url: "/Post/Delete",
        data: {
            Id: $("#delete_id_Post").val(),
        },
        success: function (result) {

            if (result == 1) {
                $.ajax({
                    url: "/Post/Seach",
                    data: {
                        Page: $("#txt_seach_post_by_page").val(),
                        KeyWord: $("#txtSeachKeywordPost").val(),
                        UserId: $("#txt_seach_post_by_user").val(),
                        Status: $("#txt_seach_post_by_status").val(),
                        CategoryId: $("#txt_seach_post_by_category").val(),
                    },
                    success: function (result) {
                        $("#Table_Post").html(result);
                        swal("Notification!", "" + window._deleted_succesfully + "", "success");
                        $("#Modal_Delete_Post").hide();
                    }
                });

            }
            else {
                $("#Modal_Delete_Post").hide();
            }
        }
    });
}




$(document).ready(function () {
    GetSelectUser();
    GetSelectUnit();
    GetSelectProvince();
});


function ShowModalDeleteLink(ID) {
    $("#deleteUrlLink").val(ID);

    $("#Modal_Delete_Link_AddPlace").show();
}

function DeleteLink() {
    $.ajax({
        url: "/Place/DeleteLink",
        data: {
            ID: $("#deleteUrlLink").val(),
        },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Delete_Link_AddPlace").hide();
                swal("Notification!", "" + window._deleted_succesfully + "", "success");
            }
            else {
                swal("Notification", "(" + window._deletion_failed + ")", "error");
            }
            SeachLink();
        }
    });
}

function AddLink() {

    $.ajax({
        url: "/Place/AddLink",
        data: {
            Title: $("#txtAddTitleLink").val(),
            Url: $("#txtAddUrlLink").val(),

        },
        success: function (result) {
            if (result == 1) {
                swal("Notification!", "add link succesfully" + "", "success");
            }
            else if (result == -1) {
                swal("Notification", " title cannot be blank", "error");
            }
            else if (result == -2) {
                swal("Notification", " url cannot be blank", "error");
            }
            else if (result == -3) {
                swal("Notification", " cannot enter more than 5 links", "error");
            }
            else if (result == -4) {
                swal("Notification", "The link already exists in the system", "error");

            }
            else {
                swal("Notification", "add link failed", "error");
            }
            SeachLink();
        }
    });
}

function SeachLink() {
    $.ajax({
        url: "/Place/SeachLink",
        success: function (result) {
            $("#Table_Add_Link").html(result);
        }
    });
}

function CloseDeleteLink() {
    $("#Modal_Delete_Link_AddPlace").hide();
    $("#Modal_Delete_Link_EditPlace").hide();
}




function SeachLinhInEditPlace() {

    $.ajax({
        url: "/Place/SeachLinks",
        data: {
            PlaceId: $("#txtIdPlace").val(),
        },
        success: function (result) {
            $("#Table_Edit_Link").html(result);
        }
    });
}


function AddLinkInEditPlace() {
    $.ajax({
        url: "/Link/AddLink",
        data: {
            PlaceId: $("#txtIdPlace").val(),
            Title: $("#txtAddTitleLink").val(),
            Url: $("#txtAddUrlLink").val(),
        },
        success: function (result) {
            if (result == 1) {
                swal("Notification!", "add link succesfully" + "", "success");
            }
            else if (result == -1) {
                swal("Notification", " title cannot be blank", "error");
            }
            else if (result == -2) {
                swal("Notification", " url cannot be blank", "error");
            }
            else if (result == -3) {
                swal("Notification", " cannot enter more than 5 links", "error");
            }
            else if (result == -4) {
                swal("Notification", "The link already exists in the system", "error");

            }
            else {
                swal("Notification", "add link failed", "error");
            }
            SeachLinhInEditPlace();
        }
    });
}


function ShowModalDelteLinkInEdit(Id) {
    $("#txtIdLink").val(Id);
    $("#Modal_Delete_Link_EditPlace").show();
}

function DeleteLinkInEditPlace() {
    $.ajax({
        url: "/Link/DeleteLink",
        data: {
            Id: $("#txtIdLink").val(),
        },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Delete_Link_EditPlace").hide();
                swal("Notification!", "" + window._deleted_succesfully + "", "success");
            }
            else {
                swal("Notification", "(" + window._deletion_failed + ")", "error");
            }
            SeachLinhInEditPlace();
        }
    });
}

function SeachPostByUser(ID) {
    var Key = "";
    window.location = "/post/ListPost?Page=1&KeyWord=" + Key + "&UserId=" + ID;
}

function SeachPostByCust(ID) {
    var Key = "";
    window.location = "/post/ListPost?Page=1&KeyWord=" + Key + "&CustId=" + ID;
}



function SeachCust() {
    $.ajax({
        url: "/Cust/Seach",
        data: {
            Page: 1,
            Name: $("#txtSeachNameCust").val(),
            Phone: $("#txtSeachPhoneCust").val(),
            Mail: $("#txtSeachEmailCust").val(),
            MinPosted: $("#txtSeachMinPoster").val(),
            MaxPosted: $("#txtSeachMaxPoster").val(),
        },
        success: function (result) {
            $("#Table_Cust").html(result);
        }
    });
}

function UpdateCust() {

    var NumberOfPosts = $("#txtNumberOfPost").val();
    if (NumberOfPosts == "") {
        NumberOfPosts = 0;
    }

    $.ajax({
        url: "/Cust/Edit",
        data: {

            CustID: $("#txtIdCust").val(),
            NumberOfPosts: NumberOfPosts,
        },
        success: function (result) {
            if (result == 1) {
                swal("Notification!", "" + window._updated_succesfully + "", "success");
                ExitUpdateCust(); 
            }
            else {
                swal("Notification", "(" + window._failed_update + " )", "error");
            }
        }
    });
}


function ExitUpdateCust() {
    var Page = $("#txt_page_cust").val();
    var Name = $("#txt_name_cust").val();
    var Phone = $("#txt_Email_cust").val();
    var Mail = $("#txt_Phone_cust").val();
    var MinPosted = $("#txt_MinPost_cust").val();
    var MaxPosted = $("#txt_MaxPost_cust").val();
    window.location = "/cust/ListCust?Page=" + Page + "&Name=" + Name + "&Phone=" + Phone + "&Mail=" + Mail + "&MinPosted=" + MinPosted + "&MaxPosted=" + MaxPosted;  
}






function ShowDeleteCust(Id) {
    $("#delete_id_Cust").val(Id);
    $("#Modal_Delete_Cust").show(); 

}

function HideDeleteCust() {
    $("#Modal_Delete_Cust").hide(); 
}

function DeleteCust() {
    $.ajax({
        url: "/Cust/Delete",
        data: {
            Id: $("#delete_id_Cust").val()
        },
        success: function (result) {
            if (result == 1) {
                $("#Modal_Delete_Cust").hide();
                swal("Notification!", "" + window._deleted_succesfully + "", "success");

                $.ajax({
                    url: "/Cust/Seach",
                    data: {
                        Page: $("#txtAddPageCust").val(),
                        Name: $("#txtSeachNameCust").val(),
                        Phone: $("#txtSeachPhoneCust").val(),
                        Mail: $("#txtSeachEmailCust").val(),
                        MinPosted: $("#txtSeachMinPoster").val(),
                        MaxPosted: $("#txtSeachMaxPoster").val(),
                    },
                    success: function (result) {
                        $("#Table_Cust").html(result);
                    }
                });

            }
            else {
                swal("Notification", "(" + window._deletion_failed + ")", "error");
            }
        }
    });
}
