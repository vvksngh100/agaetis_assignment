import pool, { query } from "../db/db.js";


export const getEmployees = async(req, res) => {
    try {
        const response = await pool.query(`SELECT * FROM employee`);
        
        
        res.status(200).json({
            status: true,
            message: 'Data Fetched Successfully', 
            data: response.rows
        })
    } catch (err) {
        console.error('[GET EMPLOYEE]: ', err)
        res.status(500).json({
            status: false,
            error: 'Internal Server Error'
        });
    }   
}

export const addEmployee = async(req, res) => {
    try {
        const {name, email, role} = req.body;
        const response = await pool.query(`INSERT INTO employee (name, email, role) VALUES ($1, $2, $3) RETURNING *`,
            [name, email, role]);
        res.status(201).json({
            status: true,
            message: 'User Created Successfully',
            data: response.rows[0]
        });
    } catch (err) {
        console.error('[ADD EMPLOYEE]: ', err);
        res.status(500).json({
            status: false,
            error: 'Internal Server Error'
        })
    }
}

export const updateEmployee = async(req, res) => {
    try {
        const empId = req.params.id;
       const {name, email, role} = req.body;
       
       
       const empData = await pool.query(`SELECT * FROM employee WHERE id = $1`, [empId]);

       const data = empData.rows[0];
       if(!data){
            res.status(404).json({
                status: false,
                message: 'Employee Not Found',
                data: []
            })
            return;
       }

       const updatedEmpData = await pool.query('UPDATE employee SET name = $1, email = $2, role = $3 WHERE id = $4', [name, email, role, empId]);
       res.status(200).json({
        status: true,
        message: 'Employee Updated Successfully',
        data: updateEmployee.rows[0]
       });
    } catch (err) {
        console.error('[UPDATE EMPLOYEE]: ', err);
        res.status(500).json({
            status: false,
            error: 'Internal Server Error'
        });
    }
};

export const deleteEmployee = async(req, res) => {
    try {
        const empId = req.params.id;
        await pool.query(`DELETE FROM employee WHERE id = $1`, [empId]);

        res.status(204).json({
            status: true,
            message: 'No Content', 
            data: []
        })
    } catch (err) {
        console.error('[DELETE EMPLOYEE]; ',err);
        res.status(500).json({
            status: false,
            error: 'Internal Server Error'
        })
    }
}




