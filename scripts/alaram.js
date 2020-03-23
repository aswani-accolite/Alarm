$(document).ready(() => {
    console.log("HI");
    loadData();
});

let newGProductId = 0;

let priorities = [{
        id: 1,
        type: 'Low'
    },
    {
        id: 2,
        type: 'Medium'
    },
    {
        id: 3,
        type: 'High'
    },
    {
        id: 4,
        type: 'Top Priority'
    },
]

let statusCodes = [{
        id: 1,
        type: 'In-Progress'
    },
    {
        id: 2,
        type: 'On-Hold'
    },
    {
        id: 3,
        type: 'Completed'
    },
    {
        id: 4,
        type: 'Closed'
    },
    {
        id: 5,
        type: 'Open'
    },
    {
        id: 6,
        type: 'Scope Dropped'
    },
    {
        id: 7,
        type: 'Client Awaiting'
    },
    {
        id: 8,
        type: 'Duplicate'
    },
]

let productInfo = [{
        prodId: randomNumber(),
        prodName: 'Iphone',
        proposalDate: '2020-03-15',
        deliveredDate: '2020-04-15',
        currentStatus: 6,
        priority: 3,
        sUser: 'Shiva Prasad',
        remarks: 'No remarks'
    },
    {
        prodId: randomNumber(),
        prodName: 'Samsung',
        proposalDate: '2020-03-15',
        deliveredDate: '2020-04-15',
        currentStatus: 6,
        priority: 3,
        sUser: 'Shiva Prasad',
        remarks: 'No remarks'
    },
    {
        prodId: randomNumber(),
        prodName: 'Oneplus',
        proposalDate: '2020-03-15',
        deliveredDate: '2020-04-15',
        currentStatus: 6,
        priority: 3,
        sUser: 'Shiva Prasad',
        remarks: 'No remarks'
    }, {
        prodId: randomNumber(),
        prodName: 'Nokia',
        proposalDate: '2020-03-15',
        deliveredDate: '2020-04-15',
        currentStatus: 6,
        priority: 3,
        sUser: 'Shiva Prasad',
        remarks: 'No remarks'
    }, {
        prodId: randomNumber(),
        prodName: 'MI',
        proposalDate: '2020-03-15',
        deliveredDate: '2020-04-15',
        currentStatus: 8,
        priority: 3,
        sUser: 'Shiva Prasad',
        remarks: 'No remarks'
    }
];
productInfo = [];
newGProductId = 0;



function loadData() {
    console.log("Logg");
    let alaramBody = '';
    $('#tbody').find('tr').remove();
    productInfo.forEach(product => {
        alaramBody += `<tr id="${product.prodId}">
                            <td><div  col_name="prodId">${product.prodId} </div></td>
                            <td><input type="text" name="" id="" class="row_data prod${product.prodId} disabled"   col_name="prodName" value="${product.prodName}"></td>
                            <td><input type="date" name="" id="" class="row_data prod${product.prodId} disabled"   col_name="proposalDate" value="${product.proposalDate}"></td>
                            <td><input type="date" name="" id="" class="row_data prod${product.prodId} disabled"   col_name="deliveredDate" value="${product.deliveredDate}"></td>
                            <td>${getCurrentStatus(product.currentStatus, product.prodId)}</td>
                            <td>${getPriorities(product.currentStatus, product.prodId)}</td>
                            <td><input type="text" name="" id="" class="row_data prod${product.prodId} disabled"   col_name="sUser" value="${product.sUser}"></td>
                            <td><input type="text" name="" id="" class="row_data prod${product.prodId} disabled"   col_name="remarks" value="${product.remarks}"></td>
                            <td><div class="row_data btnDiv"  col_name="Actions">${getAction(product.prodId)} </div></td>
                        </tr>`;
    });
    $('#tbody').html(alaramBody);
    setTimeout(() => {
        productInfo.forEach(prod => {
            checkProdStatus(prod.prodId);
        });
    }, 200);
}

function getCurrentStatus(statusId, prodId) {
    let statusInfo = '';
    if (+prodId === 0) {
        statusInfo += `<select class="prod${prodId} contentEd" col_name="currentStatus">`;
    } else {
        statusInfo += `<select class="prod${prodId} disabled" col_name="currentStatus">`;
    }
    statusCodes.forEach(status => {
        if (+status.id === +statusId) {
            statusInfo += `<option value='${status.id}' selected>${status.type}`;
        } else {
            statusInfo += `<option value='${status.id}' >${status.type}`;
        }
    });
    statusInfo += '</select>';
    return statusInfo;
}

function getPriorities(priorityId, prodId) {
    let priorityInfo = '';
    if (+prodId === 0) {
        priorityInfo += `<select class="prod${prodId} contentEd" col_name="priority">`;
    } else {
        priorityInfo += `<select class="prod${prodId} disabled" col_name="priority">`;
    }

    priorities.forEach(priority => {
        if (+priority.id === +priorityId) {
            priorityInfo += `<option value='${priority.id}' selected>${priority.type}`;
        } else {
            priorityInfo += `<option value='${priority.id}' >${priority.type}`;
        }
    });
    priorityInfo += '</select>';
    return priorityInfo;
}

function getAction(productId) {
    let actionDiv = '';
    actionDiv += `<span class="fa fa-pencil-square-o btn_edit prodE${productId}" aria-hidden="true" onclick="editProduct(${productId})"></span>`;
    actionDiv += `<span class="fa fa-floppy-o btn btn_save prodS${productId} hide" aria-hidden="true" onclick="saveProduct(${productId})"></span>`;
    actionDiv += `<span class="fa fa-times-circle btn btn_cancel prodC${productId} hide" aria-hidden="true" onclick="cancelProduct(${productId})"></span>`;
    return actionDiv
}


function editProduct(productId) {
    cancelProduct(productId);
    let className = `prod${productId}`;
    $(`.${className}`)
        .removeClass('disabled')
        .addClass('contentEd');
    // const htmlTDelement = document.getElementsByClassName(className);
    // for (let index = 0; index < htmlTDelement.length; index++) {
    //     const element = htmlTDelement[index];
    //     element.classList.add('contentEd');
    // }
    $(`.prodE${productId}`).hide();
    $(`.prodS${productId}`)
        .removeClass('hide')
        .addClass('show');
    $(`.prodC${productId}`)
        .removeClass('hide')
        .addClass('show');

}


function saveProduct(productId) {

    let className = `prod${productId}`;
    const htmlTDelement = document.getElementsByClassName(className);
    const rNum = randomNumber()
    let newObjec = {};
    if (+productId === 0) {

        if (rNum !== 0) {
            newObjec.prodId = rNum;
        } else {
            saveProduct(0);
            return;
        }
    }

    for (let index = 0; index < htmlTDelement.length; index++) {
        const element = htmlTDelement[index];
        const colname = $(element).attr('col_name');
        if (+productId > 0) {
            const _index = productInfo.findIndex(p => +p.prodId === +productId);
            if (+_index > -1) {
                productInfo[+_index][colname] = element.value;
            }
        } else {
            newObjec[colname] = element.value;
        }
    }
    console.log(newObjec);

    if (+productId === 0) {
        productId = rNum;
        productInfo = [...productInfo, newObjec];
        loadData();
    } else {
        cancelProduct(productId);
        checkProdStatus(productId);
    }


}

function cancelProduct(pId) {
    if (pId === 0) {
        document.getElementById(pId).remove();
    }
    $('#prodTable td input').removeClass("contentEd").addClass('disabled');
    $('#prodTable td select').removeClass("contentEd").addClass('disabled');
    $('#prodTable td div').removeAttr("contenteditable");
    $('.btn_edit').show();
    $(`.btn`)
        .removeClass('show')
        .addClass('hide');
    $(`.btn`)
        .removeClass('show')
        .addClass('hide');
}

function checkProdStatus(productId) {
    const prodInfo = productInfo.filter(_p => +_p.prodId === +productId);
    if (prodInfo.length === 1) {
        const cd = new Date();
        const pdd = new Date(prodInfo[0]['deliveredDate']);
        if (cd > pdd && +prodInfo[0]['currentStatus'] !== 8) {
            $(`#${productId}`).addClass('warning')
        } else {
            $(`#${productId}`).removeClass('warning')
        }
    }
}

function appendData() {
    let alaramBody = '';
    const rNum = 0;
    let actionDiv = '';
    actionDiv += `<span class="fa fa-floppy-o btn btn_save prodS${rNum}" aria-hidden="true" onclick="saveProduct(${rNum})"></span>`;
    actionDiv += `<span class="fa fa-times-circle btn btn_cancel prodC${rNum}" aria-hidden="true" onclick="cancelProduct(${rNum})"></span>`;
    alaramBody += `<tr id="${rNum}">
                        <td><div  col_name="prodId">${rNum} </div></td>
                        <td><input type="text" name="" id="" class="row_data prod${rNum} contentEd"   col_name="prodName" value=""></td>
                        <td><input type="date" name="" id="" class="row_data prod${rNum} contentEd"   col_name="proposalDate" value=""></td>
                        <td><input type="date" name="" id="" class="row_data prod${rNum} contentEd"   col_name="deliveredDate" value=""></td>
                        <td>${getCurrentStatus(1, rNum)}</td>
                        <td>${getPriorities(1, rNum)}</td>
                        <td><input type="text" name="" id="" class="row_data prod${rNum} contentEd"   col_name="sUser" value=""></td>
                        <td><input type="text" name="" id="" class="row_data prod${rNum} contentEd"   col_name="remarks" value=""></td>
                        <td><div class="row_data btnDiv"  col_name="Actions">${actionDiv} </div></td>
                    </tr>`;
    $('#tbody').append(alaramBody);
}

function randomNumber() {
    return newGProductId++;
}