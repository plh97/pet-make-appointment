<template>
    <div class="container">
        <div class="header">
            <el-button type="primary" @click="data.centerDialogVisible = true">创建新预约</el-button>
        </div>
        <el-table class="table" :data="data.tableData" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="name" label="姓名">
                <template #default="scope">
                    <el-input v-if="data.datacurrentEditLineId === scope.row._id" v-model="scope.row.name"
                        size="small" />
                    <span v-else>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述">
                <template #default="scope">
                    <el-input type="textarea" v-if="data.currentEditLineId === scope.row._id"
                        v-model="scope.row.description" size="small" />
                    <span v-else>{{ scope.row.description }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="预约时间">
                <template #default="scope">
                    <!-- <span>{{ parseDate(scope.row.date) }}</span> -->
                    <el-date-picker :readonly="data.currentEditLineId !== scope.row._id" v-model="scope.row.date"
                        type="date" placeholder="选择日期" />
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template #default="scope">
                    <el-button @click="handleUpdateBook(scope.row)" v-if="data.currentEditLineId === scope.row._id"
                        size="small" type="success">保存</el-button>
                    <el-button @click="handleEditBook(scope.row._id)" v-else size="small"
                        type="primary">Edit</el-button>
                    <el-button @click="handleDeleteBook(scope.row._id)" size="small" type="danger">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="footer" v-if="data.totalCount > data.pageSize" layout="prev, pager, next"
            :total="data.totalCount" :page-size="data.pageSize" />
        <el-dialog align-center title="创建预约" v-model="data.centerDialogVisible" width="600px">
            <div class="dialog-container">
                <el-form ref="ruleFormRef" :model="dialogForm" label-width="80px" :rules="dialogRules">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="dialogForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input v-model="dialogForm.description" />
                    </el-form-item>
                    <el-form-item label="日期" prop="date">
                        <el-date-picker v-model="dialogForm.date" type="date" placeholder="选择日期" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer" slot="footer">
                    <el-button @click="data.centerDialogVisible = false">取消</el-button>
                    <el-button type="danger" @click="resetForm(ruleFormRef)">重置</el-button>
                    <el-button type="primary" @click="handleCreateBook(ruleFormRef)">创建</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { dayjs, ElMessage, FormInstance } from 'element-plus'
import Vue, { ref, onMounted, reactive } from 'vue';
import { List } from '../api';

type Book = {
    _id: string;
    name: string;
    description: string;
    date: Date;
};

const ruleFormRef = ref<FormInstance>()

const data = reactive({
    centerDialogVisible: false,
    tableData: [],
    pageSize: 20,
    currentEditLineId: String(Math.random()),
    totalCount: 0,
});
const dialogForm = reactive({
    _id: '',
    name: '',
    description: '',
    date: new Date(),
});
const dialogRules = {
    name: [
        { required: true, message: "姓名必须填写", trigger: "blur" },
        { min: 2, message: "至少两个字", trigger: "blur" }
    ],
    description: [
        { required: true, message: "描述必须填写", trigger: "blur" },
        { min: 2, message: "至少两个字", trigger: "blur" }
    ]
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const parseDate = (date: number) => {
    return (
        dayjs(date).format('YYYY-MM-DD HH:mm:ss') // '25/01/2019'
    );
}
const init = async () => {
    try {
        const res = await List.get();
        data.tableData = res.list;
        data.totalCount = res.totalCount;
    } catch (err) {
        ElMessage.error(err.message);
    }
};
/**
 * handleEditBook
 * @param {id}
 */
const handleEditBook = (id: string) => {
    data.currentEditLineId = id;
}
/**
 * handleUpdateBook
 * @param {id}
 */
const handleUpdateBook = async (book: Book) => {
    await List.update(book);
    init();
    data.currentEditLineId = '';
};
/**
 * handleSaveBook
 * @param {id}
 */
const handleDeleteBook = async (id: string) => {
    await List.delete(id);
    init();
};
/**
 * handleCreateBook
 * @param {id}
 */


const handleCreateBook = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            data.centerDialogVisible = false;
            await List.create(dialogForm);
            init();
            dialogForm.name = '';
            dialogForm.author = '';
        } else {
            console.log('error submit!', fields)
        }
    })
}

onMounted(() => {
    init();
});

</script>

<style lang="less">
.container {
    color: red;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 16px);

    .header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }

    .table {
        flex: 1;
    }

    .footer {
        margin-top: 10px;
        align-self: center;
    }

    .dialog-container {
        padding-right: 30px;
    }
}
</style>
