using System;
using System.Data;
using System.Data.SqlClient;

namespace DAL_01
{
    public static class DAL
    {

        public static int GetCarTypeID()
        {
            SqlConnection connection = new SqlConnection("data source=LAPTOP-B3Q1QC6L\\SQLEXPRESS;initial catalog=CarRentDB;integrated security=True");

            string LastId = "";
            int carTypeId = 0;
            SqlCommand LastID = new SqlCommand(
              "SELECT TOP(1)CarTypeID from CarTypes ORDER BY 1 DESC ",
              connection);
            try
            {
                connection.Open();
                SqlDataReader reader = LastID.ExecuteReader();
                while (reader.Read())
                {
                    LastId = reader["CarTypeID"].ToString();
                }

                carTypeId = Convert.ToInt32(LastId);
            }
            catch
            {
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
            return carTypeId;
        }

        public static int GetBranchID()
        {
            SqlConnection connection = new SqlConnection("data source=LAPTOP-B3Q1QC6L\\SQLEXPRESS;initial catalog=CarRentDB;integrated security=True");

            string LastId = "";
            int BranchId = 0;
            SqlCommand LastID = new SqlCommand(
              "SELECT TOP(1)BranchID from Branches ORDER BY 1 DESC ",
              connection);
            try
            {
                connection.Open();
                SqlDataReader reader = LastID.ExecuteReader();
                while (reader.Read())
                {
                    LastId = reader["BranchID"].ToString();
                }

                BranchId = Convert.ToInt32(LastId);

            }
            catch
            {
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }

            }
            return BranchId;
        }

        //public static int GetUserID()
        //{
        //    SqlConnection connection = new SqlConnection("data source=Laptop-b3q1qc6l\\SQLEXPRESS;initial catalog=CarRentDB;integrated security=True");

        //    string LastId = "";
        //    int UserId = 0;
        //    SqlCommand LastID = new SqlCommand(
        //      "SELECT TOP(1)UserID from Users ORDER BY 1 DESC ",
        //      connection);
        //    try
        //    {
        //        connection.Open();
        //        SqlDataReader reader = LastID.ExecuteReader();
        //        while (reader.Read())
        //        {
        //            LastId = reader["UserID"].ToString();
        //        }

        //        UserId = Convert.ToInt32(LastId);
        //    }
        //    catch
        //    {
        //    }
        //    finally
        //    {
        //        if (connection.State == ConnectionState.Open)
        //        {
        //            connection.Close();
        //        }
        //    }
        //    return UserId;
        //}

        public static int GetCarID()
        {
            SqlConnection connection = new SqlConnection("data source=Laptop-b3q1qc6l\\SQLEXPRESS;initial catalog=CarRentDB;integrated security=True");

            string LastId = "";
            int carId = 0;
            SqlCommand LastID = new SqlCommand(
              "SELECT TOP(1)CarID from Cars ORDER BY 1 DESC ",
              connection);
            try
            {
                connection.Open();
                SqlDataReader reader = LastID.ExecuteReader();
                while (reader.Read())
                {
                    LastId = reader["CarID"].ToString();
                }

                carId = Convert.ToInt32(LastId);
            }
            catch
            {
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
            return carId;
        }
    }
}
