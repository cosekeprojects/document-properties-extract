<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
<html>
<head>
  <title>Document Properties</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css" rel="stylesheet" type="text/css" >
<link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" >

</head>
    <body>
        <h3>Documents</h3>
                <p>
                  aspect = ${aspectsearchpath}
                </p>
                <p>
                  type = ${typesearchpath}
                </p>
                <table id="properties" class="table table-striped table-bordered" style="width:100%">
                  <thead>
                    <tr>
              <#if whitepapers?first??>
                <#list whitepapers?first.docProperties as property>
                   
                    <th>${property.key}</th>
        
                </#list>
               </#if>
                 </tr>
            </thead>
         <tbody>
            <#list whitepapers as child>
                <tr>
                <#list child.docProperties as property>
                   
                      <td>${property.value}</td>
                  
                </#list>
              </tr>
            </#list>
        </tbody>
        </table>
 <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.1/js/dataTables.buttons.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.html5.min.js"></script>
<script>
  $(document).ready(function() {
    $('#properties').DataTable({
        dom: 'lBfrtip',
         "lengthMenu": [[10, 25, 50,100, -1], ["show 10", "show 25", "show 50", "show 100", "All"]]
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    });
} );
</script>
    </body>
</html>