<template lang="pug">
.container
    span {{ tableData }}
    .header
        el-button(type="primary" @click="centerDialogVisible=true") Add Book
    el-table.table(
        :data="tableData"
        style="width: 100%"
        border
        height="250"
    )
        el-table-column(label="NO" sortable width="70")
            template(#default="scope")
                span {{ scope.$index+1 }}
        el-table-column(prop="name" label="Name")
            template(#default="scope")
                el-input(v-if="currentEditLineId === scope.row._id" v-model="scope.row.name" size="small")
                span(v-else) {{scope.row.name}}
        el-table-column(prop="author" label="Author")
            template(#default="scope")
                el-input(v-if="currentEditLineId === scope.row._id" v-model="scope.row.author" size="small")
                span(v-else) {{scope.row.author}}
        el-table-column(prop="createAt" sortable label="CreateAt")
            template(#default="scope")
                span {{parseDate(scope.row.createAt)}}
        el-table-column(prop="updateAt" sortable label="UpdateAt")
            template(#default="scope")
                span {{parseDate(scope.row.updateAt)}}
        el-table-column(label="Action" width="160")
            template(#default="scope")
                el-button(@click="handleUpdateBook(scope.row)" v-if="currentEditLineId === scope.row._id" size="small" type="success") Save
                el-button(@click="handleEditBook(scope.row._id)" v-else size="small" type="primary") Edit
                el-button(@click="handleDeleteBook(scope.row._id)" size="small" type="danger") Delete
</template>


<script lang="ts">
import Vue, { ref, onMounted, reactive } from 'vue'
import { List } from "../api";

type Book = {
    _id: string;
    name: string;
    author: string;
    createAt: Date;
    updateAt: Date;
};


export default {
    setup() {
        const form = ref<HTMLFormElement>(null)
        const data = reactive({
            centerDialogVisible: false,
            tableData: [],
            currentEditLineId: String(Math.random()),
            dialogForm: {
                _id: "",
                name: "",
                author: "",
                createAt: new Date(),
                updateAt: new Date()
            }
        })
        const dialogRules = {
            name: [
                { required: true, message: "Require Book Name", trigger: "blur" },
                { min: 3, message: "At Least 3 Letter", trigger: "blur" }
                // { max: 10, message: "No More Than 10 Letter", trigger: "blur" }
            ],
            author: [
                { required: true, message: "Require Book Author", trigger: "blur" },
                { min: 1, message: "At Least 1 Letter", trigger: "blur" }
                // { max: 10, message: "No More Than 10 Letter", trigger: "blur" }
            ]
        };
        const method = {
            parseDate(date) {
                return (
                    new Date(date).toLocaleDateString() +
                    " " +
                    new Date(date).toLocaleTimeString()
                );
            },
            async init() {
                try {
                    const res = await List.get();
                    data.tableData = res.list;
                } catch (err) {
                    ElMessage.error(err.message);
                }
            },
            /**
             * handleEditBook
             * @param {id}
             */
            handleEditBook(id: string) {
                data.currentEditLineId = id;
            },
            /**
             * handleUpdateBook
             * @param {id}
             */
            async handleUpdateBook(book: Book) {
                await List.update(book);
                method.init();
                data.currentEditLineId = "";
            },
            /**
             * handleSaveBook
             * @param {id}
             */
            async handleDeleteBook(id: string) {
                await List.delete(id);
                method.init();
            },
            /**
             * handleCreateBook
             * @param {id}
             */
            async handleCreateBook(formName) {
                form.validate(async (valid: boolean) => {
                    if (valid) {
                        data.centerDialogVisible = false;
                        await List.create(data.dialogForm);
                        method.init();
                        data.dialogForm.name = "";
                        data.dialogForm.author = "";
                    }
                });
            },
        }
        return {
            form,
            dialogRules,
            ...method,
            ...data,
        }
    },
    mounted() {
        this.init();
    },
}
</script>

<style lang="less">
.container {
    color: red;
    display: flex;
    flex-direction: column;
    height: 100%;

    .header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }

    .row {
        flex: 1;
    }

    .dialog-container {
        padding-right: 30px;
    }
}
</style>