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
    
    public partial class BinhLuan
    {
        public int MaBL { get; set; }
        public string MaSP { get; set; }
        public string MaKH { get; set; }
        public string NoiDung { get; set; }
        public Nullable<System.DateTime> NgayDang { get; set; }
        public string HoTen { get; set; }
        public string Email { get; set; }
        public string DaTraLoi { get; set; }
        public Nullable<int> Parent { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
        public virtual SanPham SanPham { get; set; }
    }
}
