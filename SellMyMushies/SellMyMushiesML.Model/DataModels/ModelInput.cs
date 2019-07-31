//*****************************************************************************************
//*                                                                                       *
//* This is an auto-generated file by Microsoft ML.NET CLI (Command-Line Interface) tool. *
//*                                                                                       *
//*****************************************************************************************

using Microsoft.ML.Data;

namespace SellMyMushiesML.Model.DataModels
{
    public class ModelInput
    {
        [ColumnName("Program"), LoadColumn(0)]
        public string Program { get; set; }


        [ColumnName("Year"), LoadColumn(1)]
        public float Year { get; set; }


        [ColumnName("Period"), LoadColumn(2)]
        public string Period { get; set; }


        [ColumnName("Week_Ending"), LoadColumn(3)]
        public float Week_Ending { get; set; }


        [ColumnName("Geo_Level"), LoadColumn(4)]
        public string Geo_Level { get; set; }


        [ColumnName("State"), LoadColumn(5)]
        public string State { get; set; }


        [ColumnName("State_ANSI"), LoadColumn(6)]
        public float State_ANSI { get; set; }


        [ColumnName("Ag_District"), LoadColumn(7)]
        public float Ag_District { get; set; }


        [ColumnName("Ag_District_Code"), LoadColumn(8)]
        public float Ag_District_Code { get; set; }


        [ColumnName("County"), LoadColumn(9)]
        public float County { get; set; }


        [ColumnName("County_ANSI"), LoadColumn(10)]
        public float County_ANSI { get; set; }


        [ColumnName("Zip_Code"), LoadColumn(11)]
        public float Zip_Code { get; set; }


        [ColumnName("Region"), LoadColumn(12)]
        public string Region { get; set; }


        [ColumnName("watershed_code"), LoadColumn(13)]
        public float Watershed_code { get; set; }


        [ColumnName("Watershed"), LoadColumn(14)]
        public float Watershed { get; set; }


        [ColumnName("Commodity"), LoadColumn(15)]
        public string Commodity { get; set; }


        [ColumnName("Data_Item"), LoadColumn(16)]
        public string Data_Item { get; set; }


        [ColumnName("Domain"), LoadColumn(17)]
        public string Domain { get; set; }


        [ColumnName("Domain_Category"), LoadColumn(18)]
        public string Domain_Category { get; set; }


        [ColumnName("Value"), LoadColumn(19)]
        public float Value { get; set; }


        [ColumnName("CV____"), LoadColumn(20)]
        public float CV____ { get; set; }


    }
}
