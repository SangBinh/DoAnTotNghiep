//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace APIProject.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class DonHangKH
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DonHangKH()
        {
            this.ChiTietDonHangs = new HashSet<ChiTietDonHang>();
        }
    
        public string MaDH { get; set; }
        public string MaKH { get; set; }
        public Nullable<decimal> PhiVanChuyen { get; set; }
        public string PTGiaoDich { get; set; }
        public Nullable<System.DateTime> NgayDatMua { get; set; }
        public Nullable<int> TinhTrangDH { get; set; }
        public Nullable<double> Tongtien { get; set; }
        public string Ghichu { get; set; }
        public string Diachi { get; set; }
        public string Dienthoai { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; }
    }
}
