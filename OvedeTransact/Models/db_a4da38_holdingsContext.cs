using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace OvedeTransact.Models
{
    public partial class db_a4da38_holdingsContext : DbContext
    {
        public db_a4da38_holdingsContext()
        {
        }

        public db_a4da38_holdingsContext(DbContextOptions<db_a4da38_holdingsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Ahhttransaction> Ahhttransactions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=SQL5104.site4now.net;Database=db_a4da38_holdings;User Id=db_a4da38_holdings_admin;Password=Holdins@123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Account>(entity =>
            {
                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.RecoveryCode).HasMaxLength(50);

                entity.Property(e => e.Username).HasMaxLength(50);
            });

            modelBuilder.Entity<Ahhttransaction>(entity =>
            {
                entity.ToTable("AHHTTransactions");

                entity.Property(e => e.AgreedPrice)
                    .HasMaxLength(50)
                    .HasColumnName("Agreed_Price");

                entity.Property(e => e.AhhtCommission)
                    .HasMaxLength(50)
                    .HasColumnName("AHHT_Commission");

                entity.Property(e => e.BuyerAccountName)
                    .HasMaxLength(50)
                    .HasColumnName("Buyer_Account_Name");

                entity.Property(e => e.BuyerAccountNumber)
                    .HasMaxLength(50)
                    .HasColumnName("Buyer_Account_Number");

                entity.Property(e => e.BuyerBankName)
                    .HasMaxLength(50)
                    .HasColumnName("Buyer_Bank_Name");

                entity.Property(e => e.BuyerCodeConfirmed).HasColumnName("Buyer_Code_Confirmed");

                entity.Property(e => e.BuyerEmailAddress)
                    .HasMaxLength(50)
                    .HasColumnName("Buyer_Email_Address");

                entity.Property(e => e.BuyerMobileNumber)
                    .HasMaxLength(50)
                    .HasColumnName("Buyer_Mobile_Number");

                entity.Property(e => e.ConfirmationCode)
                    .HasMaxLength(50)
                    .HasColumnName("Confirmation_Code");

                entity.Property(e => e.SellerAccountName)
                    .HasMaxLength(50)
                    .HasColumnName("Seller_Account_Name");

                entity.Property(e => e.SellerAccountNumber)
                    .HasMaxLength(50)
                    .HasColumnName("Seller_Account_Number");

                entity.Property(e => e.SellerBankName)
                    .HasMaxLength(50)
                    .HasColumnName("Seller_Bank_Name");

                entity.Property(e => e.SellerCodeConfirmed).HasColumnName("Seller_Code_Confirmed");

                entity.Property(e => e.SellerMobileNumber)
                    .HasMaxLength(50)
                    .HasColumnName("Seller_Mobile_Number");

                entity.Property(e => e.SellertTransactionCode)
                    .HasMaxLength(50)
                    .HasColumnName("Sellert_Transaction_Code");

                entity.Property(e => e.ShippingCost)
                    .HasMaxLength(50)
                    .HasColumnName("Shipping_Cost");

                entity.Property(e => e.TotalCost)
                    .HasMaxLength(50)
                    .HasColumnName("Total_Cost");

                entity.Property(e => e.TransactionCode)
                    .HasMaxLength(50)
                    .HasColumnName("Transaction_Code");

                entity.Property(e => e.TransactionDate)
                    .HasMaxLength(50)
                    .HasColumnName("Transaction_Date");

                entity.Property(e => e.TransactionDescription)
                    .HasColumnType("ntext")
                    .HasColumnName("Transaction_Description");

                entity.Property(e => e.TransactionStatus)
                    .HasMaxLength(50)
                    .HasColumnName("Transaction_Status");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
