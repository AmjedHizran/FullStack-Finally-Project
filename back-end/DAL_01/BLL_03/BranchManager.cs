using BOL_02;
using DAL_01;
using System.Collections.Generic;
using System.Linq;

namespace BLL_03
{
    public class BranchManager : BaseLogic
    {

        // Get all Branches: 
        public List<BranchModel> GetAllBranches()
        {
            return DB.Branches.Select(o =>
                new BranchModel
                {
                    Name = o.Name,
                    Address = o.Address,
                    Latitude = o.Latitude,
                    Longitude = o.Longitude

                }).ToList();
        }

        // Get one Branch: 
        public BranchModel GetOneBranch(int BranchID)
        {
            var query = from o in DB.Branches
                        where o.BranchID == BranchID
                        select new BranchModel
                        {
                            BranchID=o.BranchID,
                            Name = o.Name,
                            Address = o.Address,
                            Latitude = o.Latitude,
                            Longitude = o.Longitude
                        };

            return query.SingleOrDefault();
        }

        // Add new Branch: 
        public BranchModel AddBranch(BranchModel BranchModel)
        {

            Branch branch = new Branch
            {
                Name = BranchModel.Name,
                Address = BranchModel.Address,
                Latitude = BranchModel.Latitude,
                Longitude = BranchModel.Longitude
            };

            DB.Branches.Add(branch);
            DB.SaveChanges();
            return BranchModel; // Return the added Branch with all its fields.
        }

        // Update complete branch: 
        public BranchModel UpdateBranch(BranchModel branchModel, string BranchName)
        {
            var query = from o in DB.Branches
                        where o.Name == BranchName
                        select o;

            Branch branch = query.SingleOrDefault();
            if (branch == null)
                return null;
            branch.Name = branchModel.Name;
            branch.Address = branchModel.Address;
            branch.Latitude = branchModel.Latitude;
            branch.Longitude = branchModel.Longitude;
            DB.SaveChanges();

            return branchModel; // Return the updated model.
        }

        // Delete branch:
        public bool DeleteBranch(int id)
        {
            var query = from o in DB.Branches
                        where o.BranchID == id
                        select o;

            Branch branch = query.SingleOrDefault();
            if (branch == null)
                return false;

            DB.Branches.Remove(branch);
            DB.SaveChanges();
            return true;
        }
    }
}
