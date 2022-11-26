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

        var formatPrice = price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}); 
        var formatSalePrice = salePrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        var html = `
            <tr>
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
        $('#name').val('');
        $('#price').val('');
        $('#sale-price').val('');
    });

    // Delete record
    $('#crudTable').on('click', '.btn-remove', function() {
        $(this).parent().parent().remove();
    });
});