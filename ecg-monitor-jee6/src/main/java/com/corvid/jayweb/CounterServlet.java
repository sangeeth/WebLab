package com.corvid.jayweb;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import javax.servlet.AsyncContext;
import javax.servlet.AsyncEvent;
import javax.servlet.AsyncListener;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = {"/counter"}, asyncSupported = true)
public class CounterServlet extends HttpServlet {

    private static final Queue<AsyncContext> queue = new ConcurrentLinkedQueue<AsyncContext>();

    private static final BlockingQueue<String> messageQueue = new LinkedBlockingQueue<String>();

    private static final String BEGIN_SCRIPT_TAG = "<script type='text/javascript'>\n";

    private static final String END_SCRIPT_TAG = "</script>\n";

    private static final long serialVersionUID = 1L;

    private static final String JUNK = "<!-- JUNK -->\n";

    private Thread notifierThread = null;
    
    private Thread counterThread = null;
    
    class Counter implements Runnable {
		public Counter() {
			super();
		}


		@Override
		public void run() {
			int i = 0;
			System.out.println("Counter started");
			while(i<1000) {
				i++;
				String cMessage = BEGIN_SCRIPT_TAG + CounterServlet.this.toJsonp(String.valueOf(i)) + END_SCRIPT_TAG;
				try {
					CounterServlet.this.notify(cMessage);
				} catch (IOException e1) {
					e1.printStackTrace();
					break;
				}

				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
					break;
				}
			}
		}
    }

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        Runnable notifierRunnable = new Runnable() {
            public void run() {
                boolean done = false;
                while (!done) {
                    String cMessage = null;
                    try {
                        cMessage = messageQueue.take();
                        for (AsyncContext ac : queue) {
                            try {
                                PrintWriter acWriter = ac.getResponse().getWriter();
                                acWriter.println(cMessage);
                                acWriter.flush();
                            } catch(IOException ex) {
                                System.out.println(ex);
                                queue.remove(ac);
                            }
                        }
                    } catch(InterruptedException iex) {
                        done = true;
                        System.out.println(iex);
                    }
                }
            }
        };
        notifierThread = new Thread(notifierRunnable, "notifier");
        notifierThread.start();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    	System.out.println("doGet");
        res.setContentType("text/html");
        res.setHeader("Cache-Control", "private");
        res.setHeader("Pragma", "no-cache");
        
        PrintWriter writer = res.getWriter();
        // for Safari, Chrome, IE and Opera
        for (int i = 0; i < 10; i++) {
            writer.write(JUNK);
        }
        writer.flush();

        final AsyncContext ac = req.startAsync();
        ac.setTimeout(10  * 60 * 1000);
        ac.addListener(new AsyncListener() {
            public void onComplete(AsyncEvent event) throws IOException {
                queue.remove(ac);
            }

            public void onTimeout(AsyncEvent event) throws IOException {
                queue.remove(ac);
            }

            public void onError(AsyncEvent event) throws IOException {
                queue.remove(ac);
            }

            public void onStartAsync(AsyncEvent event) throws IOException {
            }
        });
        queue.add(ac);
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("text/plain");
        res.setHeader("Cache-Control", "private");
        res.setHeader("Pragma", "no-cache");

        req.setCharacterEncoding("UTF-8");
        String action = req.getParameter("action");

        if ("start".equals(action)) {
        	
        	counterThread = new Thread(new Counter(), "counter");
        	counterThread.start();
        	
           
            res.getWriter().println("success");
        } else if ("stop".equals(action)) {
        	if (counterThread!=null) {
        		counterThread.interrupt();
        	}

        	res.getWriter().println("success");
        } else {
            res.sendError(422, "Unprocessable Entity");
        }
    }

    @Override
    public void destroy() {
        queue.clear();
        notifierThread.interrupt();
        
        if (counterThread!=null) {
        	counterThread.interrupt();	
        }
        
    }

    private void notify(String cMessage) throws IOException {
        try {
            messageQueue.put(cMessage);
        } catch(Exception ex) {
            IOException t = new IOException();
            t.initCause(ex);
            throw t;
        }
    }

    private String escape(String orig) {
        StringBuffer buffer = new StringBuffer(orig.length());

        for (int i = 0; i < orig.length(); i++) {
            char c = orig.charAt(i);
            switch (c) {
            case '\b':
                buffer.append("\\b");
                break;
            case '\f':
                buffer.append("\\f");
                break;
            case '\n':
                buffer.append("<br />");
                break;
            case '\r':
                // ignore
                break;
            case '\t':
                buffer.append("\\t");
                break;
            case '\'':
                buffer.append("\\'");
                break;
            case '\"':
                buffer.append("\\\"");
                break;
            case '\\':
                buffer.append("\\\\");
                break;
            case '<':
                buffer.append("&lt;");
                break;
            case '>':
                buffer.append("&gt;");
                break;
            case '&':
                buffer.append("&amp;");
                break;
            default:
                buffer.append(c);
            }
        }

        return buffer.toString();
    }

    private String toJsonp(String message) {
        return "window.parent.app.update({ message: \"" + escape(message) + "\" });\n";
    }
}