$(document).ready(function() {
    var orders = itemList;

    function display() {
        $('.itemTable').empty();
        $('.entries').text(orders.length);
        for (var i = 0; i < orders.length; i++) {
            console.log("s");
            var row = '<tr class="itemRow" id="row-' + (i + 1) + '"></tr>';
            $('.itemTable').append(row);
            var data = "<td><input class='itemData-row-" + (i + 1) + "' box-name' type='text' value='" + orders[i].name + "' disabled=disabled></td>";
            data = data + "<td><input class='itemData-row-" + (i + 1) + "' box-qty' type='text' value='" + orders[i].qty + "' disabled=disabled></td>";
            data = data + "<td><input class='itemData-row-" + (i + 1) + "' box-date' type='text' value='" + (orders[i].date).replace('00:00:00 GMT-0600', '').replace(' ', ', ') + "' disabled=disabled></td>";
            data = data + "<td> <button type='button ' class='btn btn-default btn-sm list-btn list-remove' data='row-" + (i + 1) + "'>\
            <span class='glyphicon glyphicon-remove '></span> Remove\
            </button>\
            </div></td>";
            $('#row-' + (i + 1)).append(data);
        }
    }

    function registerTableListeners() {
        $(".list-remove").off();

        $('.list-remove').click(function() {
            var This = $(this).attr('data');
            $('#' + This).remove();
            $('.entries').text(parseInt($('.entries').text()) - 1);
        });

        $(".itemRow").off();
        $('.itemRow').click(function() {
            var temp = $(this).attr('id')
            $('.itemData-' + temp).removeAttr('disabled');
        });

        $('.list-add').click(function() {
            var n = orders.length;
            var dummy = {
                "date": " ",
                "qty": " ",
                "name": " "
            };
            orders.push(dummy);

            var row = '<tr class="itemRow" id="row-' + (n + 1) + '"></tr>';
            $('tbody').append(row);
            var data = "<td><input class='itemData-row-" + (n + 1) + "' box-name' type='text' value='" + dummy.name + "' disabled=disabled></td>";
            data = data + "<td><input class='itemData-row-" + (n + 1) + "' box-qty' type='text' value='" + dummy.qty + "' disabled=disabled></td>";
            data = data + "<td><input class='itemData-row-" + (n + 1) + "' box-date' type='text' value='" + (dummy.date).replace('00:00:00 GMT-0600', '').replace(' ', ' ') + "' disabled=disabled></td>";
            data = data + "<td> <button type='button ' class='btn btn-default btn-sm list-btn list-remove' data='row-" + (n + 1) + "'>\
            <span class='glyphicon glyphicon-remove '></span> Remove\
            </button>\
            </div></td>";
            $('#row-' + (n + 1)).append(data);
            $('.entries').text(parseInt($('.entries').text()) + 1);
            registerTableListeners();
        });
    }


    display();
    registerTableListeners();
});