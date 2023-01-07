$(document).ready(function () {
    $('#name-error').hide();
    $('#price-error').hide();
    $('#sale-price-error').hide();
    
    $("#crudSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#crudTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    // Regular expression check validate number
    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }  
    
    // Show data localStorage, JSON.parse chuyển chuỗi thành mảng lại
    if (localStorage.getItem('studyTools') != '' && localStorage.getItem('studyTools') != null) { // Kiểm tra localStorage đã tồn tại chưa
        var availableTools = JSON.parse(localStorage.getItem('studyTools'));
        if (availableTools.length > 0) { // nếu như có data
            for (let availableTool of availableTools) {
                var formatPrice = availableTool.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}); 
                var formatSalePrice = availableTool.salePrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
                var htmlAvailable = `
                    <tr data-id=${availableTool.idProduct}>
                        <td>${availableTool.idProduct}</td>
                        <td>${availableTool.name}</td>
                        <td>${formatPrice}</td>
                        <td>${formatSalePrice}</td>
                        <td>
                            <i class="fa-solid fa-trash text-danger mr-2 btn-remove" style="cursor: pointer;"></i>
                            <i class="fa-solid fa-pen text-primary" style="cursor: pointer;"></i>
                        </td>
                    </tr>
                `;
                $('#crudTable > tbody:last-child').append(htmlAvailable);
            }
        }
    }

    $('#addBtn').click(function () {
        // Check required
        if ($('#name').val() === '') {
            $('#name-error').show();
            $('#name-error').text('Name is required !')
            return false;
        }
        $('#name-error').hide();
        if ($('#price').val() === '') {
            $('#price-error').show();
            $('#price-error').text('Price is required !')
            return false
        }
        $('#price-error').hide();
        if ($('#sale-price').val() === '') {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Sale price is required !')
            return false;
        }
        $('#sale-price-error').hide();


        var name = $('#name').val();
        // Check price is a number
        if (!isNumeric($('#price').val())) {
            $('#price-error').show();
            $('#price-error').text('Price must be a number !')
            return false;
        }
        $('#price-error').hide();
        // Check sale price is a number
        if (!isNumeric($('#sale-price').val())) {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Sale Price must be a number !')
            return false;
        }
        $('#sale-price-error').hide();

        var price = Number($('#price').val()); // convert string to number
        var salePrice = Number($('#sale-price').val()); // convert string to number
        
        // Check negative value
        if (price < 0) {
            $('#price-error').show();
            $('#price-error').text('Price must be greater than 0 !')
            return false;
        }
        $('#price-error').hide();
        if (salePrice < 0) {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Sale Price must be greater than 0 !')
            return false;
        }

        // Check sale price > price
        if (salePrice > price) {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Sale Price must be less than Price !')
            return false;
        }
        $('#sale-price-error').hide();

        var idProduct = (Math.random() + 1).toString(36).substring(7);
        var formatPrice = price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}); 
        var formatSalePrice = salePrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        var html = `
            <tr data-id=${idProduct}>
                <td>${idProduct}</td>
                <td>${name}</td>
                <td>${formatPrice}</td>
                <td>${formatSalePrice}</td>
                <td>
                    <i class="fa-solid fa-trash text-danger mr-2 btn-remove" style="cursor: pointer;"></i>
                    <i class="fa-solid fa-pen text-primary" style="cursor: pointer;"></i>
                </td>
            </tr>
        `;

        $('#crudTable > tbody:last-child').append(html);

        // Save data to localStorage
        // Object
        var studyTool = {
            'idProduct': idProduct,
            'name': name,
            'price': price,
            'salePrice': salePrice
        };

        // Th1: storage studyTools chưa có dữ liệu
        if (localStorage.getItem('studyTools') == '' || localStorage.getItem('studyTools') == null) {
            var studyTools = [];
        // Th2: storage studyTools đã có dữ liệu
        } else {
            var studyTools = JSON.parse(localStorage.getItem('studyTools'));
        }

        studyTools.push(studyTool);

        // Biến mảng dữ liệu thì chuỗi (string), vì localStorage chỉ có thể lữu chuỗi hoặc số
        localStorage.setItem('studyTools', JSON.stringify(studyTools));

        $('#name').val('');
        $('#price').val('');
        $('#sale-price').val('');
    });

    // Delete record
    $('#crudTable').on('click', '.btn-remove', function() {
        var dataId = $(this).parent().parent().data('id'); // data-id
        if (localStorage.getItem('studyTools') != '' && localStorage.getItem('studyTools') != null) { // Kiểm tra localStorage đã tồn tại chưa
            var availableTools = JSON.parse(localStorage.getItem('studyTools'));
            if (availableTools.length > 0) { // nếu như có data
                for (let key in availableTools) {
                    if (dataId === availableTools[key].idProduct) { // nếu như dataId === idProduct nào đó trong localStorage
                        availableTools.splice(key, 1); // Xóa đi phần tử đó trong localStorage
                    }
                }
                localStorage.setItem('studyTools', JSON.stringify(availableTools));
            }
        }
        $(this).parent().parent().remove();
    });
});