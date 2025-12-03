<script setup lang="ts">
import { ref, onMounted } from "vue";
import { utils, writeFileXLSX } from 'xlsx';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Chart from 'primevue/chart';
import 'primeicons/primeicons.css'


const orders =[
  {
    id: "ORD-002",
    customer: "Budi",
    email: "budi@example.com",
    status: "Pending",
    total: 90000,
    date: "2025-12-02"
  },
  {
    id: "ORD-003",
    customer: "Sinta",
    email: "sinta@example.com",
    status: "Canceled",
    total: 120000,
    date: "2025-12-03"
  },
  {
    id: "ORD-004",
    customer: "Raka",
    email: "raka@example.com",
    status: "Completed",
    total: 175000,
    date: "2025-12-03"
  },
  {
    id: "ORD-005",
    customer: "Asep",
    email: "asep@example.com",
    status: "Pending",
    total: 100000,
    date: "2025-12-04"
  },
  {
    id: "ORD-006",
    customer: "Syukri",
    email: "syukri@example.com",
    status: "Canceled",
    total: 150000,
    date: "2025-12-05"
  },
  {
    id: "ORD-007",
    customer: "Rizal",
    email: "rizal@example.com",
    status: "Completed",
    total: 190000,
    date: "2025-12-06"
  },
  {
    id: "ORD-008",
    customer: "Irma",
    email: "irma@example.com",
    status: "Pending",
    total: 110000,
    date: "2025-12-07"
  },
  {
    id: "ORD-009",
    customer: "Ilham",
    email: "ilham@example.com",
    status: "Canceled",
    total: 130000,
    date: "2025-12-08"
  },  {
    id: "ORD-010",
    customer: "Nur",
    email: "nur@example.com",
    status: "Canceled",
    total: 150000,
    date: "2025-12-08"
  },  {
    id: "ORD-011",
    customer: "Rahim",
    email: "rahim@example.com",
    status: "Pending",
    total: 170000,
    date: "2025-12-08"
  },  {
    id: "ORD-012",
    customer: "Farhan",
    email: "farhan@example.com",
    status: "Completed",
    total: 190000,
    date: "2025-12-08"
  },
  {
    id: "ORD-010",
    customer: "Rizki",
    email: "rizki@example.com",
    status: "Completed",
    total: 200000,
    date: "2025-12-09"
  }
];

const data = ref(orders);

const exportPdf = async () => {
  try {
    // Import jsPDF and autoTable
    const { default: jsPDF } = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;
    
    const doc = new jsPDF('p', 'pt', 'a4');
    
    // Add title and date
    doc.setFontSize(18);
    doc.text('Orders Report', 40, 40);
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 40, 60);
    
    // Prepare table data
    const tableColumn = ['ID', 'Customer', 'Email', 'Status', 'Total', 'Date'];
    const tableRows = data.value.map(order => [
      order.id,
      order.customer,
      order.email,
      order.status,
      `Rp${order.total.toLocaleString()}`,
      order.date
    ]);
    
    // Add table using autoTable with type assertion
    (autoTable as any)(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 80,
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: 'linebreak',
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 50, halign: 'center' },
        1: { cellWidth: 60 },
        2: { cellWidth: 80 },
        3: { cellWidth: 50, halign: 'center' },
        4: { cellWidth: 50, halign: 'right' },
        5: { cellWidth: 60, halign: 'center' }
      },
      didDrawPage: function(data: any) {
        // Add page number
        const pageCount = data.pageCount || 1;
        doc.setFontSize(10);
        doc.text(
          `Page ${data.pageNumber || 1} of ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 20,
          { align: 'center' as const }
        );
      }
    });

    // Save the PDF
    doc.save(`orders_${new Date().toISOString().slice(0, 10)}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};



function exportExcel() {
  /* Create a new workbook */
  const wb = utils.book_new();
  
  /* Add a worksheet for the data */
  const ws = utils.json_to_sheet(data.value);
  
  /* Add title and date to the first row */
  const title = "Orders Report";
  const date = new Date().toLocaleString();
  const titleRow = [title];
  const dateRow = [`Generated on: ${date}`];
  
  /* Insert title and date at the beginning of the worksheet */
  utils.sheet_add_aoa(ws, [titleRow, dateRow, []], { origin: "A1" });
  
  /* Add the worksheet to the workbook with a name */
  utils.book_append_sheet(wb, ws, "Orders");
  
  /* Export to XLSX with a descriptive filename */
  const fileName = `orders_${new Date().toISOString().slice(0, 10)}.xlsx`;
  writeFileXLSX(wb, fileName);
}

//Chart 
const chartData = ref();
const chartOptions = ref();

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

// --- Hitung jumlah order by status ---
const getStatusSummary = () => {
    const statusList = ["Pending", "Completed", "Canceled"];

    return statusList.map(status => {
        return data.value.filter(item => item.status === status).length;
    });
};

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    const labels = ["Pending", "Completed", "Canceled"];
    const datasetValues = getStatusSummary();

    return {
        labels: labels,
        datasets: [
            {
                data: datasetValues,
                backgroundColor: [
                    documentStyle.getPropertyValue('--p-orange-500'),
                    documentStyle.getPropertyValue('--p-green-500'),
                    documentStyle.getPropertyValue('--p-red-500')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--p-orange-400'),
                    documentStyle.getPropertyValue('--p-green-400'),
                    documentStyle.getPropertyValue('--p-red-400')
                ]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};


// Option button for export
const exportOption = ref(false);

// function optionSelected (param) {
//   window.alert(`you chose ${param}`)
//   exportOption.value = true;
// }


</script>

<template>
  <div class="min-h-screen bg-gray-800 p-6">
    <!-- Header Section -->
    <Header/>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Table Card -->
        <div class="lg:col-span-2">
            <div class="bg-gray-900 rounded-xl shadow-md overflow-hidden">
                <div class="p-6">
                    <h2 class="text-lg font-semibold text-white mb-4">Order Details</h2>
                    <DataTable 
                        :value="data" 
                        :paginator="true" 
                        :rows="10"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        class="p-datatable-sm"
                        :scrollable="true"
                        scrollHeight="flex"
                    >
                    <Column field="id" header="ID" sortable style="width: 5%"></Column>
                    <Column field="customer" header="Customer" sortable style="width: 20%"></Column>
                    <Column field="email" header="Email" sortable style="width: 25%"></Column>
                    <Column field="status" header="Status" sortable style="width: 15%">
                        <template #body="{ data: rowData }">
                        <span :class="{
                            'px-2 py-1 rounded-full text-xs font-medium': true,
                            'bg-yellow-300 text-yellow-800': rowData.status === 'Pending',
                            'bg-green-300 text-green-800': rowData.status === 'Completed',
                            'bg-red-300 text-red-800': rowData.status === 'Canceled'
                        }">
                            {{ rowData.status }}
                        </span>
                        </template>
                    </Column>
                    <Column field="total" header="Total" sortable style="width: 15%">
                        <template #body="{ data: rowData }">
                        <span class="font-medium">Rp{{ rowData.total.toLocaleString() }}</span>
                        </template>
                    </Column>
                    <Column field="date" header="Date" sortable style="width: 20%"></Column>
                    </DataTable>
                </div>
                <div class="flex space-x-3 p-4 justify-end">

                  <Button v-if="!exportOption" label="Export" @click="exportOption = true" />
                  <div v-if="exportOption" class="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg ">
                    <h2 class="mb-2">Chose export opotion</h2>
                    <div class="flex gap-4">
                      <Button
                        severity="danger"
                        label="Export PDF"
                        icon="pi pi-file-pdf text-red-800"
                        @click="exportPdf"
                      />
                      <Button
                        severity="success"
                        label="Export Excel"
                        icon="pi pi-file-excel text-green-800"
                        @click="exportExcel"
                      />
                    </div>
                    <Button label="cancel" @click="exportOption = false" />

                  </div>
                </div>
            </div>
        </div>

      <!-- Chart Card -->
      <div class="lg:col-span-1">
        <div class="bg-gray-900 rounded-xl shadow-md p-6 h-full">
          <h2 class="text-lg font-semibold text-white mb-4">Order Status</h2>
          <div class="w-full h-80">
            <Chart 
              type="pie" 
              :data="chartData" 
              :options="{
                ...chartOptions,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 20,
                      usePointStyle: true,
                      pointStyle: 'circle',
                      fontColor: 'white',
                    }
                  }
                }
              }" 
              class="w-full h-full" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>