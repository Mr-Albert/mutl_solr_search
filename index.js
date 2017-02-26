$(function () {
	
	//searchbox
	document.getElementById("search-button").addEventListener("click", function(){
        //window.location = document.getElementById('link-box').value;
       
		
		//debuging code starts
        alert("searcg term i s : " +document.getElementById('link-box').value);
        //and so it ends
        
   });
	
	document.getElementById('link-box').addEventListener('keypress', function (e) {
	    var key = e.which || e.keyCode;
	    if (key === 13) { 
	    	alert("searcg term i s : " +document.getElementById('link-box').value);
	    }
	});
	
	
	
	
	function pqDatePicker(ui) {
        var $this = $(this);
        $this
            .css({ zIndex: 3, position: "relative" })
            .datepicker({
                yearRange: "-20:+0", //20 years prior to present.
                changeYear: true,
                changeMonth: true,
                showButtonPanel: true,
                onClose: function (evt, ui) {
                    $(this).focus();
                }
            });
        //default From date
        $this.filter(".pq-from").datepicker("option", "defaultDate", new Date("01/01/1996"));
        //default To date
        $this.filter(".pq-to").datepicker("option", "defaultDate", new Date("12/31/1998"));
    }
	
	
	
	 var colM = [
	             { title: "ShipCountry", width: 100, dataIndx: "ShipCountry",
	                 filter: { type: 'textbox', condition: 'begin', listeners: ['change'] }
	             },
	             { title: "Customer Name", width: 120, dataIndx: "ContactName",
	                 filter: { type: 'textbox', condition: 'begin', listeners: ['change'] }
	             },
	             { title: "Order ID", minWidth: 130, dataIndx: "OrderID", dataType: "integer",
	                 filter: { type: 'textbox', condition: "between", listeners: ['change'] }
	             },
	     		{ title: "Order Date", minWidth: "190", dataIndx: "OrderDate", dataType: "date",
	     		    filter: { type: 'textbox', condition: "between", init: pqDatePicker, listeners: ['change'] }
	     		},
	             { title: "Shipping Region", width: 130, dataIndx: "ShipRegion",
	                 filter: { type: 'select',
	                     //attr: "multiple", //for multiple
	                     //style:"height:120px;",//for multiple
	                     condition: 'equal', 
	                     //condition: 'range', //for multiple
	                     valueIndx: "ShipRegion",
	                     labelIndx: "ShipRegion",
	                     groupIndx: "ShipCountry",
	                     prepend: { '': '--Select--' },
	                     listeners: ['change']
	                 }
	             },
	             { title: "Paid", width: 100, dataIndx: "paid", dataType: "bool", align: "center",
	                 filter: { type: "checkbox", subtype: 'triple', condition: "equal", listeners: ['click'] }
	             },
	     		{ title: "Shipping Via", width: 140, dataIndx: "ShipVia",
	     		    filter: { type: "select",
	     		        condition: 'equal',
	     		        prepend: { '': '--Select--' },
	     		        valueIndx: "ShipVia",
	     		        labelIndx: "ShipVia",
	     		        listeners: ['change']
	     		    }
	     		},
	     		{ title: "Required Date", width: 100, dataIndx: "RequiredDate", dataType: "date" },
	     		{ title: "Shipped Date", width: 100, dataIndx: "ShippedDate", dataType: "date" },
	             { title: "Freight", width: 100, align: "right", dataIndx: "Freight", dataType: "float" },
	             { title: "Shipping Name", width: 150, dataIndx: "ShipName" },
	             { title: "Shipping Address", width: 270, dataIndx: "ShipAddress" },
	             { title: "Shipping City", width: 100, dataIndx: "ShipCity" },
	             { title: "Shipping Postal Code", width: 180, dataIndx: "ShipPostalCode" }

	     		];

        var dataModel = {
            location: "remote",
            
            sorting: "local",
            
            dataType: "JSON",
            method: "GET",
            url: "/index.php",
            
            
            getData: function (dataJSON) {
                var data = dataJSON.data;
                return { curPage: dataJSON.curPage, totalRecords: dataJSON.totalRecords, data: data };
            }
        };

      /*  var grid1 = $("grid_paging").pqGrid({ width: 800, height: 450,
            dataModel: dataModel,
            colModel: colM,
            
            pageModel: { type: 'local', rPP: 20 },
            editable: false,

            
            //pageModel: { type: "remote", rPP: 20, strRpp: "{0}" },
            sortable: false,
            //selectionModel: { swipe: false },
            wrap: false,
            //virtualX:false, 
            numberCell: { resizable: true, width: 30, title: "#" },
            
            
            selectionModel: { type: 'cell' },
            filterModel: { on: true, mode: "AND", header: true },
            title: "Shipping Orders",
            resizable: true,
            hwrap:false,            
            freezeCols: 2            
        });*/
        
        
        var obj = { width: 800, height: 500,
                dataModel: dataModel,
                colModel: colM,
                pageModel: { type: 'remote', rPP: 20 },
                editable: false,
                selectionModel: { type: 'cell' },
                filterModel: { on: true, mode: "AND", header: true },
                title: "Shipping Orders",
                resizable: true,
                hwrap:false,
                freezeCols: 2
            };
            var $grid = $("#grid_paging").pqGrid(obj);
        
        
    });

