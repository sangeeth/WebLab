package dojoessentials.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class XhrPostDemoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String name = req.getParameter("name");

		PrintWriter out = resp.getWriter();
		
		out.printf("{ name: '%s', age: '%s', occupation: '%s'}", name, 60, "Politics");
		out.flush();
	}
}
