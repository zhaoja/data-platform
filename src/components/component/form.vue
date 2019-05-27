<template>
    <el-col :span="20">
        <div class="grid-content bg-purple">
            <div class="main">
                <template>
                    <el-radio-group v-model="radio1" @change="onChange(radio1)">
                        <el-radio label="1">备选项</el-radio>
                        <el-radio label="2">备选项</el-radio>
                        <el-radio label="3" disabled>备选项</el-radio>
                    </el-radio-group>
                </template>
                <template>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </template>
            </div>
        </div>
    </el-col>
</template>

<script>
    const cityOptions = ['上海', '北京', '广州', '深圳'];

    export default {
        data() {
            return {
                radio1: '1',
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true
            };
        },
        methods: {
            onChange(radio1) {
                console.log(radio1)
            },
            handleCheckAllChange(val) {
                console.log(val)
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                console.log(value)
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            }
        }
    }
</script>

<style>

</style>