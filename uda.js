$(function(){
    var udaHelper = {
        dataTable: {},
        isCreated: false,
        tinchihoanthanh: "",
        diemtrungbinh: "",
        options: {
            'lengthMenu': [[10, 20, 30, 50, -1], [10, 20, 30, 50, "Tất cả"]],
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": true,
            "language": {
                sProcessing: "Đang xử lý...",
                sLengthMenu: "Xem _MENU_ mục",
                sZeroRecords: "Không tìm thấy dòng nào phù hợp",
                sInfo: "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
                sInfoEmpty: "Đang xem 0 đến 0 trong tổng số 0 mục",
                sInfoFiltered: "(được lọc từ _MAX_ mục)",
                sInfoPostFix: "",
                sSearch: "Tìm kiếm:",
                sUrl: "",
                oPaginate: {
                    sFirst: "Đầu",
                    sPrevious: "Trước",
                    sNext: "Tiếp",
                    sLast: "Cuối"
                }
            }
        }
    }
    
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    
        if (request.action[0] == "smartTable") {
            if (!udaHelper.isCreated) {
                smartTable.init();
                return;
            }
            alert("Bạn đã thực hiện chức năng này!!! Reset để tạo tại.");
        }
        if (request.action == "sendMail") {
            window.open('mailto:thamdv96@gmail.com');
            return;
        }
        if (request.action == "reset") {
            smartTable.destroy();
            $('table:first > tbody').append(udaHelper.tinchihoanthanh);
            $('table:first > tbody').append(udaHelper.diemtrungbinh);
            udaHelper.dataTable = null;
            udaHelper.isCreated = false;
            return;
        }
    });
    
    chrome.runtime.sendMessage({ action: "show" });
    
    var smartTable = {
        destroy: function () {
            if (!udaHelper.dataTable) return;
            
            $.each(udaHelper.dataTable, function () {
                $(this).dataTable().fnDestroy();
            });
            $("#top-statistic").remove();
            $("#main-header").unstick();
        },
        init: function () {
            var soTinChi = $('table:first > tbody > tr:nth-last-child(2) > td:nth-last-child(2)').text();
            var tongDiem = $('table:first > tbody > tr:last > td:nth-last-child(2)').text();
    
            udaHelper.tinchihoanthanh = "<tr>" + $('table:first > tbody > tr:nth-last-child(2)').html() + "</tr>";
            udaHelper.diemtrungbinh = "<tr>" + $('table:first > tbody > tr:last').html() + "</tr>";
    
            $('table:first > tbody > tr').slice(-2).remove();
    
            $("#main-header").sticky({ topSpacing: 0 });
    
            $(".header-top > .row > div:last").append("<p id='top-statistic' style='color: #fff; font-size: 16px;padding-top: 8px;'>Tổng điểm: " + tongDiem + " - Hoàn thành: " + soTinChi + " (tín chỉ).</p>");
    
            $('table').dataTable(udaHelper.options);
            udaHelper.dataTable = $.fn.dataTable.fnTables(true);
            
            $('#main-header').on('sticky-start', function () {
                $('#main-header').addClass("animated fadeInDown z-index");
            });
            $('#main-header').on('sticky-end', function () {
                $('#main-header').removeClass("animated fadeInDown z-index");
            });
            udaHelper.isCreated = true;
        }
    }
});